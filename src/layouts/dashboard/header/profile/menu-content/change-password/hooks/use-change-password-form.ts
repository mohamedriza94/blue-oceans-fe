import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useChangePasswordApi } from "./use-change-password-api";

export type TChangePasswordPayload = {
  newPassword: string;
  confirmedNewPassword: string;
  currentPassword: string;
};

export const ZOD_ChangePasswordSchema = z
  .object({
    newPassword: z.string().min(1, { message: "Password is required" }),
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    confirmedNewPassword: z
      .string()
      .min(1, { message: "Confirmed Password is required" }),
  })
  .superRefine((data, ctx) => {
    const passwordErrors: string[] = [];

    if (data.newPassword.length < 8) {
      passwordErrors.push("at least 8 characters long");
    }
    if (!/[A-Z]/.test(data.newPassword)) {
      passwordErrors.push("contain one uppercase letter");
    }
    if (!/[a-z]/.test(data.newPassword)) {
      passwordErrors.push("contain one lowercase letter");
    }
    if (!/\d/.test(data.newPassword)) {
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

    if (data.newPassword !== data.confirmedNewPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormValues = z.infer<typeof ZOD_ChangePasswordSchema>;

export const useChangePasswordForm = () => {
  const { mutate: PostChangePassword, ...loginApiData } =
    useChangePasswordApi();

  const form = useForm<TChangePasswordPayload>({
    initialValues: {
      newPassword: "",
      confirmedNewPassword: "",
      currentPassword: "",
    },
    validate: zodResolver(ZOD_ChangePasswordSchema),
  });

  const handleSubmit = (values: FormValues) => {
    PostChangePassword(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return { form, handleSubmit, ...loginApiData };
};
