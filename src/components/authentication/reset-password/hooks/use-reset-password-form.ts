import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useResetPasswordApi } from "./use-reset-password-api";
import { useRouter } from "next/router";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { unprotectedPaths } from "@/shared/constants/paths";

export type TResetPasswordPayload = {
  token?: string; // Token is directly fetched from URL
  password: string;
  confirmedPassword: string;
};

export const ZOD_ResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    confirmedPassword: z
      .string()
      .min(1, { message: "Confirmed Password is required" }),
  })
  .superRefine((data, ctx) => {
    const passwordErrors: string[] = [];

    if (data.password.length < 8) {
      passwordErrors.push("at least 8 characters long");
    }
    if (!/[A-Z]/.test(data.password)) {
      passwordErrors.push("contain one uppercase letter");
    }
    if (!/[a-z]/.test(data.password)) {
      passwordErrors.push("contain one lowercase letter");
    }
    if (!/\d/.test(data.password)) {
      passwordErrors.push("contain at least one number");
    }

    if (passwordErrors.length > 0) {
      const errorMessage =
        passwordErrors.length > 1
          ? `Password must be: ${passwordErrors.slice(0, -1).join(", ")} and ${
              passwordErrors[passwordErrors.length - 1]
            }`
          : `Password must be: ${passwordErrors[0]}`;

      ctx.addIssue({
        path: ["password"],
        message: errorMessage,
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password !== data.confirmedPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormValues = z.infer<typeof ZOD_ResetPasswordSchema>;

export const useResetPasswordForm = () => {
  const { query, push } = useRouter();
  const { mutate, ...resetPasswordApiData } = useResetPasswordApi();
  const showAlert = useAlertModal();

  const form = useForm<TResetPasswordPayload>({
    initialValues: {
      password: "",
      confirmedPassword: "",
    },
    validate: zodResolver(ZOD_ResetPasswordSchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(
      { ...values, token: query.token as string },
      {
        onSuccess: () => {
          form.reset();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Password Updated Successfully",
              subtext: "Try signing in now",
            },
            confirmButtonText: "Go to Login",
            confirmButtonClickAction() {
              push(unprotectedPaths.login);
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  return { form, handleSubmit, ...resetPasswordApiData };
};
