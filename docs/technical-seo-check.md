# Technikai SEO-ellenőrzés — 2026. október 16.

A mérés a Next.js 16.4.1 production buildjét vizsgálta helyben. A szolgáltatások
szövege nem bővült. A korábban elkészült metaadatok és strukturált cégadatok
ellenőrzése mellett ez a kör az űrlapra, mérésre és teljesítményre összpontosított.

## Elkészült változtatások

- A fejlesztői és buildparancs explicit `--webpack` kapcsolót kapott.
- Az ajánlatkérő csak sikeres HTTP-válasz után jelzi a küldés sikerét.
  Szerverhiba, hálózati hiba vagy 20 másodperces időtúllépés esetén megőrzi
  a mezők értékét, hibát jelez és újrapróbálható. Küldés közben a gomb letiltott.
- A településválasztó a React Hook Form `Controller` komponensével kapcsolódik
  az űrlaphoz. A lenyíló lista csak megnyitáskor épül fel.
- Az e-mail-ellenőrzés elfogadja a `+` címkéket és a hosszabb végződéseket is;
  az elérhetőségi mezők megfelelő HTML-típust és autocomplete jelölést kaptak.
- A sikeres ajánlatkérés `generate_lead` eseményt küld
  `{ method: "quotation_form" }` paraméterrel.
- A telefonlink aktiválása `phone_click` eseményt küld
  `{ method: "phone_link" }` paraméterrel. Egyik új esemény sem tartalmazza
  a kitöltött nevet, e-mail-címet, telefonszámot vagy üzenetet.
- A telefonlinkekből minden szóköz eltűnik.
- A fejléc logója megfelelő méretű optimalizált képváltozatot használ.
- Az SVG-háttér SVGO-optimalizálást kapott. Fájlméret: 559 214 → 229 490 bájt;
  gzip-méret: 221 467 → 100 535 bájt. A viewBox változatlan. A 200×300 pixeles
  összehasonlítás átlagos színcsatorna-eltérése 0,022 volt a 0–255 skálán.
- A korábbi favicon valójában ICO néven tárolt 574×525-ös PNG volt.
  A meglévő képből szabványos, négyzetes, 32/48/64/128 pixeles méreteket
  tartalmazó ICO készült. Fájlméret: 286 359 → 25 189 bájt.

## Ellenőrzési eredmények

A production build és a TypeScript-ellenőrzés sikeres.

A böngészős ellenőrzés a főoldalt, az impresszumot és az adatkezelési oldalt
390×844 és 1440×1000 méretben vizsgálta. A tesztek ellenőrizték az egyedi
címeket és metaleírásokat, a canonical URL-eket, a JSON-LD-t, a H1-eket,
a címsorok helyes beágyazását, a képek betöltését és a mobilmenüt.
A robots.txt és a sitemap elérhető; a nem létező oldal 404-et és noindexet ad.
JavaScript- vagy hidratációs hiba nem jelentkezett.

Az űrlap tesztjei elfogott helyi hálózati válaszokat használtak, valódi e-mail
és éles analitikai hálózati kérés nélkül. Ellenőrzött esetek:

- Hiányos űrlap nem indít küldést.
- HTTP 500 és hálózati hiba esetén nincs sikerjelzés vagy lead esemény.
- A kitöltött adatok megmaradnak, a küldés újrapróbálható.
- Folyamatban lévő kérés közben az ismételt gombkattintás nem indít új kérést.
- Sikeres újrapróbálás pontosan egy lead eseményt hoz létre.
- A telefonkattintás külön eseményt hoz létre.
- A 20 másodperces időtúllépés után az űrlap ismét használható.

## Mobilos Lighthouse-mérés

Lighthouse 13.5.0, helyi production szerver, alapértelmezett mobilos szimuláció.
A Google Analytics, Google Tag Manager és Maps kérései mindegyik futásban
tiltva voltak. Ez laboreredmény, nem az éles oldal valós látogatóinak mérése
és nem Google-helyezési pontszám.

| Mutató | Kezdeti állapot | Képoptimalizálás után | Végleges állapot |
| --- | ---: | ---: | ---: |
| Teljesítmény | 76 | 75 | 76 |
| SEO | 100 | 100 | 100 |
| Akadálymentesség | 100 | 100 | 100 |
| Bevált gyakorlatok | 100 | 100 | 100 |
| LCP | 2,3 s | 2,7 s | 2,8 s |
| TBT | 1010 ms | 920 ms | 790 ms |
| CLS | 0,003 | 0 | 0,003 |
| Átvitt adat | 1 030 778 bájt | 644 225 bájt | 641 906 bájt |

Az átvitt adat 37,7%-kal csökkent. A teljesítménypontszám nem nőtt, és az
LCP-mérés rosszabb lett; ebből nem állítható általános sebességjavulás.
A további optimalizálás fő területe a kezdeti JavaScript-feldolgozás.
Az éles CDN és a valódi külső kérések mellett új mérés szükséges.

A részletes HTML/JSON jelentések és a böngészős teszt összefoglalója itt vannak:
`%TEMP%\hollo-vill-seo-20261016` (`baseline.report.*`, `after.report.*`,
`final.report.*`, `browser-checks.json`, `live-check.json`).

## Élesítés és fiókhozzáférés után

Az október 16-i nyilvános HTTP-ellenőrzés szerint az éles domainen még
ugyanaz a cím szerepelt mindhárom oldalon, canonical és JSON-LD nélkül;
a robots.txt még nem hivatkozott a sitemapre. A helyi javítások élesítése
ezért külön lépés.

1. Deploy után újra ellenőrizni kell a három oldal metaadatait, a sitemapet,
   a robots.txt-t, a 404-választ és a mobilos teljesítményt.
2. A strukturált adatokat a Google Rich Results Testtel is ellenőrizni kell.
3. Search Console-hozzáféréssel beküldendő a `https://hollo-vill.hu/sitemap.xml`;
   URL-ellenőrzéssel megvizsgálandó az indexelés és a Google canonical választása.
4. GA4 DebugView/Realtime felületen ellenőrizendők az új események.
   A `generate_lead` eseményt a fiókban kulcseseményként kell beállítani,
   ha még nem az. A telefonkattintás önmagában nem bizonyít létrejött hívást.

A Search Console- és GA4-fiók állapota nem volt hozzáférhető; ezekben
beállításváltoztatás nem történt.

## Nyitóképernyő HTML/CSS átalakítása — külön mérési kör

A `landing-page.tsx` natív HTML-elemeket és a `globals.css` hero-stílusait
használja. A szerveroldali `page.tsx` rendereli, majd `children` formájában
adja át a kliensoldali `HomePage` komponensnek. A nyitóképernyő így nem kerül
be a kliensoldali importfába. A kapcsolat gomb natív `#contact` hivatkozás.
A gomb CSS-e a meglévő gombrecept megjelenését követi.

A 320, 390, 767, 768, 1023, 1024 és 1440 pixeles nézetekben rögzített
méretek és vizsgált számított CSS-tulajdonságok mind megegyeztek az eredetivel.
A desktop hover- és billentyűzetfókusz-stílusok is megegyeztek.
A képernyőképek öt szélességen és a hover-képen pixelre azonosak voltak;
390 pixelen a színcsatornák 0,0003%-a, 767 pixelen 0,056%-a tért el,
geometriai vagy számított stílusbeli eltérés nélkül.

Sikeres böngészős ellenőrzések: kapcsolat gomb kattintással és Enterrel,
88 pixeles fejléceltolás, csökkentett animáció, megjelenés és hivatkozás
letiltott oldal-JavaScript mellett. JavaScript- vagy hidratációs hiba nem volt.
A production build és TypeScript-ellenőrzés is sikeres.

| Mutató | Átalakítás előtt | Átalakítás után |
| --- | ---: | ---: |
| Mobilos Lighthouse teljesítmény | 75 | 84 |
| SEO / akadálymentesség / bevált gyakorlatok | 100 / 100 / 100 | 100 / 100 / 100 |
| TBT | 900 ms | 450 ms |
| LCP | 2,7 s | 2,8 s |
| CLS | 0 | 0,003 |
| A főoldal saját JS-chunkja | 23 320 bájt | 21 830 bájt |
| Ugyanez gzip tömörítéssel | 8033 bájt | 7649 bájt |

A nyitóképernyő szövege az átalakítás után nem szerepel ebben a JS-chunkban.
A két Lighthouse-futás azonos helyi mobilos beállításokat használt; a mérések
ingadozhatnak, és az eredmény nem az éles oldal valós látogatóinak mérése.
A képernyőképek, CSS-adatok, összehasonlítás és Lighthouse-jelentések helye:
`%TEMP%\hollo-vill-hero-20261016`.

## Menüpontok görgetési eltolása

A szakaszok `scroll-margin-top` értéke 88-ról 64 pixelre módosult,
így a szakasz kezdete közvetlenül a 64 pixeles rögzített fejléc alá kerül.
Mobilon és asztali nézetben a három menüpont, a felfelé görgetés, a közvetlen
hash-hivatkozás, az impresszumról visszatérés és a nyitóképernyő kapcsolat
gombja is sikeresen ellenőrizve lett. A mért eltérés minden esetben 1 pixel
alatti volt; böngészős hiba nem jelentkezett. A production build és a
TypeScript-ellenőrzés sikeres.
