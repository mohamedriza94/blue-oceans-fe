import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { TActivate2FAPayload, useActivate2FAApi } from "./use-2fa-api";

const ZOD_Activate2FASchema: z.ZodType<TActivate2FAPayload> = z.object({
  otp: z.string().min(6, "OTP is required"),
});

export type FormValues = z.infer<typeof ZOD_Activate2FASchema>;

export const useActivate2FAForm = () => {
  const { mutate, ...activate2FAFormApiData } = useActivate2FAApi();

  const form = useForm<TActivate2FAPayload>({
    initialValues: {
      otp: "",
    },
    validate: zodResolver(ZOD_Activate2FASchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return { form, handleSubmit, ...activate2FAFormApiData };
};
