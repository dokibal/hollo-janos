import {
  Box,
  Field,
  Portal,
  Select,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { locations } from "../locations";
import { Quotation } from "../quotation";
import ContactBlock from "./contact-block";

const townCollection = createListCollection({
  items: Array.from(locations.values())
    .flat()
    .sort((a, b) => a.localeCompare(b, "hu"))
    .map((t) => ({ label: t, value: t })),
});

const RequiredIndicator = () => <span style={{ color: "red" }}>*</span>;

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

  const isValidEmail: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

  return isSubmitSuccessful ? (
    <VStack
      bgColor="textWhite"
      color="primary"
      borderRadius="1em"
      width="100%"
      height="fit"
      padding="2em"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2)"
    >
      <Text fontSize={{ base: "lg", md: "xl" }}>
        ✅ Árajánlatkérés sikeresen elküldve! Köszönjük, hogy megkeresett
        bennünket. Hamarosan felvesszük Önnel a kapcsolatot a megadott
        elérhetőségek egyikén.
      </Text>
    </VStack>
  ) : (
    <ContactBlock title="Kérjen árajánlatot!" color="textWhite">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box spaceY="1em">
          <Field.Root invalid={Boolean(errors.name)}>
            <Field.Label htmlFor="name" fontSize={{ base: "md", md: "lg" }}>
              Név <RequiredIndicator />
            </Field.Label>
            <Input
              id="name"
              {...register("name", { required: "A név megadása kötelező" })}
            />
            <Field.ErrorText>
              {errors.name && errors.name.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={Boolean(errors.email)}>
            <Field.Label htmlFor="email" fontSize={{ base: "md", md: "lg" }}>
              E-mail <RequiredIndicator />
            </Field.Label>
            <Input
              id="email"
              {...register("email", {
                required: "Az e-mail cím megadása kötelező",
                validate: (value) =>
                  isValidEmail.test(value) || "Érvénytelen e-mail formátum",
              })}
            />
            <Field.ErrorText>
              {errors.email && errors.email.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={Boolean(errors.phoneNumber)}>
            <Field.Label
              htmlFor="phoneNumber"
              fontSize={{ base: "md", md: "lg" }}
            >
              Telefonszám
            </Field.Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: false,
                validate: (value) =>
                  !value ||
                  isValidPhoneNumber(value) ||
                  "A telefonszám formátuma nem megfelelő (helyes formátum: +36201111111)",
              })}
            />
            <Field.ErrorText>
              {errors.phoneNumber && errors.phoneNumber.message}
            </Field.ErrorText>
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
              <Select.Label fontSize={{ base: "md", md: "lg" }}>
                Helyszín <RequiredIndicator />
              </Select.Label>
              <Select.Control>
                <Select.Trigger
                  borderColor="primary"
                  _focus={{ borderColor: "accent" }}
                  backgroundColor="white"
                >
                  <Select.ValueText />
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
            <Field.Label htmlFor="messaged" fontSize={{ base: "md", md: "lg" }}>
              Leírás <RequiredIndicator />
            </Field.Label>
            <Textarea
              maxLength={1000}
              rows={9}
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
              fontSize={{ base: "md", md: "lg" }}
            />
            <Field.HelperText fontSize="sm">
              Maximum 1000 karakter
            </Field.HelperText>
            <Field.ErrorText>
              {errors.message && errors.message.message}
            </Field.ErrorText>
          </Field.Root>
        </Box>
        <Text
          width="100%"
          marginTop="clamp(1rem, 2vw, 3rem)"
          marginBottom="0.5em"
          fontSize={{ base: "md", md: "lg" }}
        >
          Az űrlap elküldésével elfogadja az{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            style={{
              textDecoration: "underline",
              outline: "none",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            Adatkezelési tájékoztatónkat
          </Link>
          .
        </Text>
        <Box width="100%" justifyContent="center" display="flex">
          <Button disabled={isSubmitting}>{`Küldés${
            isSubmitting ? "..." : ""
          }`}</Button>
        </Box>
      </form>
    </ContactBlock>
  );
}
