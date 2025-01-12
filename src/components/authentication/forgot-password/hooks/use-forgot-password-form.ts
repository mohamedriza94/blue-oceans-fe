import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useForgotPasswordApi } from "./use-forgot-password-api";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";

export type TForgotPasswordPayload = {
  email: string;
};

const ZOD_ForgotPasswordSchema: z.ZodType<TForgotPasswordPayload> = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type FormValues = z.infer<typeof ZOD_ForgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  const { mutate, ...forgotPasswordApiData } = useForgotPasswordApi();
  const showAlert = useAlertModal();

  const form = useForm<TForgotPasswordPayload>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(ZOD_ForgotPasswordSchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();

        showAlert({
          type: "success",
          defaultChildrenTexts: {
            headerText: "Check your Email",
            subtext:
              "A link to reset your password has been sent to your Email.",
          },
          showCloseButton: false,
        });
      },
    });
  };

  return { form, handleSubmit, ...forgotPasswordApiData };
};
