import {
  Box,
  Field,
  Heading,
  Icon,
  Portal,
  Select,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LuCheck } from "react-icons/lu";
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
  const [successMinHeight, setSuccessMinHeight] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const successContentRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isSent) return;

    successHeadingRef.current?.focus({ preventScroll: true });
    successContentRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  }, [isSent]);

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

      setSuccessMinHeight(sectionRef.current?.getBoundingClientRect().height ?? 0);
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
    <section id="quotation" ref={sectionRef}>
      {isSent ? (
        <VStack
          role="status"
          aria-labelledby="quotation-success-title"
          bgColor="white"
          color="primary"
          borderRadius="16px"
          border="1px solid #E4E5E2"
          borderTop="4px solid"
          borderTopColor="accent"
          width="100%"
          minH={`${Math.max(successMinHeight, 560)}px`}
          justify="center"
          padding={{ base: "32px 24px", md: "56px 40px" }}
          boxShadow="0 8px 24px rgba(0,0,0,0.12)"
        >
          <VStack
            ref={successContentRef}
            gap="24px"
            textAlign="center"
            maxW="400px"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxSize="80px"
              borderRadius="full"
              background="#FFF5BF"
              aria-hidden="true"
            >
              <Icon boxSize="40px" strokeWidth="2.5">
                <LuCheck />
              </Icon>
            </Box>
            <VStack gap="12px">
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="#62686D"
              >
                Sikeres árajánlatkérés
              </Text>
              <Heading
                as="h2"
                id="quotation-success-title"
                ref={successHeadingRef}
                tabIndex={-1}
                fontSize={{ base: "28px", md: "32px" }}
                lineHeight="1.2"
                letterSpacing="-0.02em"
                outline="none"
              >
                Köszönjük a megkeresését!
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.7"
                color="#50565B"
              >
                Árajánlatkérését sikeresen elküldtük.
              </Text>
            </VStack>
            <Box
              width="100%"
              background="#F7F7F2"
              border="1px solid #E8E9E1"
              borderRadius="12px"
              padding="20px"
            >
              <Text fontWeight="700" mb="8px">
                Mi történik ezután?
              </Text>
              <Text color="#50565B" lineHeight="1.7">
                Átnézzük a megadott részleteket, és hamarosan felvesszük Önnel a
                kapcsolatot a megadott elérhetőségek egyikén.
              </Text>
            </Box>
          </VStack>
        </VStack>
      ) : (
        <ContactBlock title="Kérjen árajánlatot!" color="textWhite">
          <form
            noValidate
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
