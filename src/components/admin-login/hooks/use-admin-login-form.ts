import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useAdminLoginApi } from "./use-admin-login-api";

export type TAdminLoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const ZOD_AdminLoginSchema: z.ZodType<TAdminLoginPayload> = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
  rememberMe: z.boolean(),
});

export type FormValues = z.infer<typeof ZOD_AdminLoginSchema>;

export const useAdminLoginForm = () => {
  const { mutate: PostLogin, ...adminLoginApiData } = useAdminLoginApi();

  const form = useForm<TAdminLoginPayload>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: zodResolver(ZOD_AdminLoginSchema),
  });

  const handleSubmit = (values: FormValues) => {
    PostLogin(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return { form, handleSubmit, ...adminLoginApiData };
};
