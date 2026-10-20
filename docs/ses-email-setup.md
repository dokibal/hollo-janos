# Ajánlatkérő levelezés – AWS SES

Az ajánlatkérő űrlap a `/.netlify/functions/send-email` végpontot hívja.
A Netlify-függvény közvetlenül az SES v2 API-val küld; a sablonok a
`lib/email/quotation-templates.ts` fájlban vannak, HTML- és szöveges változatban.
Nem kell külön sablont létrehozni az AWS konzolban.

## 1. AWS előfeltételek

- Az SES Frankfurt (`eu-central-1`) régiójában a `hollo-vill.hu` domain legyen
  **Verified**, a DKIM állapota **Successful**.
- A domain három DKIM CNAME-rekordja maradjon a DNS-ben a hitelesítés után is.
- Az Account dashboard → Request production access felületen kérj éles küldést.
  Típus: **Transactional**, weboldal: `https://hollo-vill.hu`.
  A használat: a látogató által beküldött ajánlatkérés után egy belső értesítés
  és egy ügyfél-visszaigazolás, havi körülbelül 10 kérés / 20 levél, marketing nélkül.
- Hagyd bekapcsolva az identitás **Email feedback forwarding** funkcióját,
  és figyeld az `info@hollo-vill.hu` címre érkező bounce-/panaszértesítéseket.
  Hibás vagy panaszt jelző címre ne kezdeményezz újabb küldést.
- Sandboxban csak hitelesített címzettekre (vagy SES Mailbox Simulator címekre)
  lehet küldeni. A valós ügyfeleket kiszolgáló induláshoz éles hozzáférés kell.

## 2. Külön küldési jogosultság

Hozz létre egy kizárólag az alkalmazásnak szánt IAM-felhasználót, például
`hollo-vill-ses-sender`, konzolos bejelentkezés nélkül. Ne használd a személyes
adminisztrátori kulcsodat. Az alábbi policy engedélyezi az SES SendEmail műveletet
a frankfurti domainazonosítóval, az `info@hollo-vill.hu` feladóról:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "arn:aws:ses:eu-central-1:010460825441:identity/hollo-vill.hu",
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "info@hollo-vill.hu"
        }
      }
    }
  ]
}
```

Más AWS-fiók használatakor az ARN-ben cseréld ki a fiókazonosítót.
Az IAM-felhasználónál a Security credentials → Create access key lehetőséggel
hozz létre AWS API-kulcsot (az AWS-en kívül futó alkalmazás számára).
Ez **nem SES SMTP-kulcs**.

## 3. Netlify környezeti változók

A projekt **Environment variables** felületén állítsd be az alábbiakat.
Ahol választható scope, tartalmazza a **Functions** scope-ot. Az éles kulcsokat
csak a **Production** környezetnek add meg; előnézeti deployhoz használj külön
tesztbeállítást. A titkokat ne tedd a kódba vagy a `netlify.toml` fájlba.

| Változó | Érték |
| --- | --- |
| `SES_REGION` | `eu-central-1` |
| `SES_ACCESS_KEY_ID` | Az alkalmazás IAM access key ID-ja |
| `SES_SECRET_ACCESS_KEY` | A hozzá tartozó secret access key |
| `SES_SESSION_TOKEN` | Csak ideiglenes AWS-kulcsoknál szükséges |

Saját `SES_` neveket használunk, és ezeket explicit átadjuk az SDK-nak.
Így nem ütközünk a Netlify Lambda futtatókörnyezetének fenntartott `AWS_`
változóival, és nem próbáljuk a Netlify szerepkörét levélküldésre használni.

A környezeti változók módosítása után **új deploy szükséges**.
A régi `MAILGUN_API_KEY` és `MAILGUN_DOMAIN` változókat el lehet távolítani;
a kód már nem olvassa őket. A Mailgunból fennmaradt DNS-rekordokat csak akkor
töröld, ha más rendszer sem használja őket. A meglévő postafiók MX-rekordjait
őrizd meg: a bejövő levelezés továbbra is a jelenlegi szolgáltatónál működik.

## 4. Helyi ellenőrzés és éles próba

```sh
pnpm test:email
pnpm exec tsc --noEmit
pnpm build
```

A tesztek nem küldenek valódi levelet és nem igényelnek AWS-kulcsot.
Éles hozzáférés, környezeti változók és deploy után küldj egy teszt-ajánlatkérést
egy saját, ellenőrizhető e-mail-címről. Ellenőrizd mindkét postafiókot (a spam
mappát is), a magyar ékezeteket, sortöréseket és a válasz funkciót.
A belső értesítésnél a válasz az ügyfélhez, a visszaigazolásnál a céghez megy.

## Küldési sorrend és hibák

1. Először a cég értesítését fogadja el az SES. Ha ez hibázik, a végpont 500-at
   ad vissza, az ügyfél nem kap visszaigazolást, az űrlap újrapróbálható.
2. A belső értesítés elfogadása után küldjük az ügyfél visszaigazolását. Ha ez
   hibázik, naplózzuk a hibakódot, de 200-at adunk vissza, hogy az ügyfél ne
   küldje be újra a már továbbított ajánlatkérést.

A 200-as válasz az SES általi elfogadást jelenti; a postaládába kézbesítést nem
garantálja. A napló nem tartalmaz levéltörzset, kulcsot vagy SDK-hibaüzenetet.
Nincs adatbázis vagy tartós újrapróbálási sor. Az ügyfél-visszaigazolás hibáját
szükség esetén kézzel kell kezelni. Hálózati időtúllépés vagy megismételt HTTP-kérés
esetén nincs garantált duplikációvédelem.

## Források

- [SES domainhitelesítés](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
- [Production access](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [SES IAM-szabályzatok](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html)
- [SES SendEmail API](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_SendEmail.html)
- [Bounce- és panaszértesítések](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity-using-notifications-email.html)
- [Netlify Functions környezeti változók](https://docs.netlify.com/build/functions/environment-variables/)
