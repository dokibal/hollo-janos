import {
  Box,
  Field,
  Heading,
  Portal,
  Select,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { locations } from "../locations";
import { Quotation } from "../quotation";
import Link from "next/link";

const townCollection = createListCollection({
  items: locations.map((t) => ({ label: t, value: t })),
});

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Quotation>();

  const onSubmit: SubmitHandler<Quotation> = async (data) => {
    await fetch("./.netlify/functions/send-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return isSubmitSuccessful ? (
    <Text fontSize="2xl">
      ✅ Árajánlatkérés sikeresen elküldve! Köszönjük, hogy megkeresett
      bennünket. Hamarosan felvesszük Önnel a kapcsolatot a megadott
      elérhetőségek egyikén.
    </Text>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        bg="white"
        borderRadius="2em"
        width="100%"
        padding="2em"
        boxShadow="lg"
      >
        <Heading justifyContent="left">Küldjön árajánlatot nekünk!</Heading>
        <Field.Root invalid={Boolean(errors.name)}>
          <Field.Label>
            Név <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="Kovács János"
            id="name"
            {...register("name", { required: "A név megadása kötelező" })}
          />
          <Field.ErrorText>
            {errors.name && errors.name.message}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={Boolean(errors.email)}>
          <Field.Label>
            E-mail <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="kovacsjanos@gmail.com"
            id="email"
            {...register("email", {
              required: "Az email cím megadása kötelező",
            })}
          />
          <Field.ErrorText>
            {errors.email && errors.email.message}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Telefonszám</Field.Label>
          <Input
            placeholder="+36201111111"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: false,
            })}
          />
        </Field.Root>
        <Field.Root invalid={Boolean(errors.location)}>
          <Select.Root
            collection={townCollection}
            id="location"
            {...register("location", {
              required: "A helyszín megadása kötelező",
            })}
            colorPalette="red"
            borderColor="red"
          >
            <Select.HiddenSelect />
            <Select.Label>
              Helyszín <Field.RequiredIndicator />
            </Select.Label>
            <Select.Control>
              <Select.Trigger
                borderColor="primary"
                _focus={{ borderColor: "accent" }}
                backgroundColor="white"
              >
                <Select.ValueText placeholder="Tatabánya" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator color="primary" />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {townCollection.items.map(
                    (t: { label: string; value: string }) => (
                      <Select.Item item={t} key={t.value}>
                        {t.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    )
                  )}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Field.ErrorText>
            {errors.location && errors.location.message}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={Boolean(errors.message)}>
          <Field.Label>
            Leírás <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            maxLength={500}
            rows={5}
            focusRingColor="accent"
            _focus={{ borderColor: "accent" }}
            borderRadius="0.25em"
            borderColor="primary"
            backgroundColor="white"
            placeholder="Kérjük, adja meg a munka részleteit..."
            id="message"
            {...register("message", {
              required: "Az üzenet megadása kötelező",
            })}
          />
          <Field.HelperText>Maximum 500 karakter</Field.HelperText>
          <Field.ErrorText>
            {errors.message && errors.message.message}
          </Field.ErrorText>
        </Field.Root>
        <Text fontSize="sm" w="100%">
          Az űrlap elküldésével elfogadja az&nbsp;
          <Link href="privacy-policy">Adatkezelési tájékoztatónkat</Link>
        </Text>
        <Button disabled={isSubmitting}>{`Küldés${
          isSubmitting ? "..." : ""
        }`}</Button>
      </VStack>
    </form>
  );
}
