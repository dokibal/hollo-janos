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
import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
  const [isSent, setIsSent] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Quotation>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<Quotation> = async (data) => {
    clearErrors("root");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Quotation request failed");
      }

      setIsSent(true);
      sendGAEvent("event", "generate_lead", { method: "quotation_form" });
    } catch {
      setError("root.server", {
        type: "server",
        message:
          "Nem sikerült elküldeni az ajánlatkérést. Kérjük, próbálja újra, vagy keressen bennünket telefonon.",
      });
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const isValidEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <section id="quotation">
      {isSent ? (
        <VStack
          role="status"
          bgColor="white"
          color="primary"
          borderRadius="1em"
          width="100%"
          height="fit"
          padding="2em"
          boxShadow="0 8px 24px rgba(0,0,0,0.12)"
        >
          <Text fontSize={{ base: "lg", md: "xl" }}>
            ✅ Árajánlatkérés sikeresen elküldve! Köszönjük, hogy megkeresett
            bennünket. Hamarosan felvesszük Önnel a kapcsolatot a megadott
            elérhetőségek egyikén.
          </Text>
        </VStack>
      ) : (
        <ContactBlock title="Kérjen árajánlatot!" color="textWhite">
          <form
            onSubmit={handleSubmit(onSubmit)}
            aria-describedby={
              errors.root?.server ? "quotation-error" : undefined
            }
          >
            <Box spaceY="20px">
              <Field.Root invalid={Boolean(errors.name)}>
                <Field.Label htmlFor="name" fontSize={{ base: "md", md: "lg" }}>
                  Név <RequiredIndicator />
                </Field.Label>
                <Input
                  id="name"
                  autoComplete="name"
                  {...register("name", { required: "A név megadása kötelező" })}
                />
                <Field.ErrorText>
                  {errors.name && errors.name.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(errors.email)}>
                <Field.Label
                  htmlFor="email"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  E-mail <RequiredIndicator />
                </Field.Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
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
                  type="tel"
                  autoComplete="tel"
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
                <Controller
                  control={control}
                  name="location"
                  rules={{ required: "A helyszín megadása kötelező" }}
                  render={({ field }) => (
                    <Select.Root
                      collection={townCollection}
                      lazyMount
                      unmountOnExit
                      id="location"
                      name={field.name}
                      value={field.value ? [field.value] : []}
                      onValueChange={({ value }) =>
                        field.onChange(value[0] ?? "")
                      }
                    >
                      <Select.HiddenSelect
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                      <Select.Label fontSize={{ base: "md", md: "lg" }}>
                        Helyszín <RequiredIndicator />
                      </Select.Label>
                      <Select.Control>
                        <Select.Trigger
                          minH="48px"
                          borderRadius="8px"
                          borderColor="#A5A9AC"
                          _focus={{ borderColor: "primary" }}
                          _focusVisible={{
                            outline: "3px solid #B39200",
                            outlineOffset: "3px",
                          }}
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
                          <Select.Content background="white">
                            {townCollection.items.map(
                              (t: { label: string; value: string }) => (
                                <Select.Item
                                  _highlighted={{ background: "#FFF5BF" }}
                                  _selected={{ background: "#FFF5BF" }}
                                  item={t}
                                  key={t.value}
                                >
                                  <Text
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="primary"
                                  >
                                    {t.label}
                                  </Text>
                                  <Select.ItemIndicator color="primary" />
                                </Select.Item>
                              ),
                            )}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />
                <Field.ErrorText>
                  {errors.location && errors.location.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(errors.message)}>
                <Field.Label
                  htmlFor="message"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Leírás <RequiredIndicator />
                </Field.Label>
                <Textarea
                  maxLength={1000}
                  rows={6}
                  minH="160px"
                  padding="12px"
                  resize="vertical"
                  _focus={{ borderColor: "primary" }}
                  _focusVisible={{
                    outline: "3px solid #B39200",
                    outlineOffset: "3px",
                  }}
                  borderRadius="8px"
                  borderColor="#A5A9AC"
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
              marginTop="24px"
              marginBottom="20px"
              lineHeight="1.6"
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
            {errors.root?.server && (
              <Text id="quotation-error" role="alert" color="red.700" mb="20px">
                {errors.root.server.message}
              </Text>
            )}
            <Box width="100%" justifyContent="center" display="flex">
              <Button
                width={{ base: "100%", md: "auto" }}
                minW="144px"
                disabled={isSubmitting}
              >{`Küldés${isSubmitting ? "..." : ""}`}</Button>
            </Box>
          </form>
        </ContactBlock>
      )}
    </section>
  );
}
