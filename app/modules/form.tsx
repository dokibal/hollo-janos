import {
  Field,
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
    await fetch("./.netlify/functions/sendEmail", {
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
      <VStack>
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
          >
            <Select.HiddenSelect />
            <Select.Label>
              Helyszín <Field.RequiredIndicator />
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Tatabánya" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
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
        <Field.Root invalid={Boolean(errors.description)}>
          <Field.Label>
            Leírás <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            maxLength={500}
            rows={5}
            focusRingColor="accent"
            borderRadius="0.25em"
            placeholder="Add meg: munkavégzés helye, mit kell csinálni, mikorra kell, stb."
            id="description"
            {...register("description", {
              required: "Az üzenet megadása kötelező",
            })}
          />
          <Field.HelperText>Maximum 500 karakter</Field.HelperText>
          <Field.ErrorText>
            {errors.description && errors.description.message}
          </Field.ErrorText>
        </Field.Root>
        <Button disabled={isSubmitting}>{`Küldés${
          isSubmitting ? "..." : ""
        }`}</Button>
      </VStack>
    </form>
  );
}
