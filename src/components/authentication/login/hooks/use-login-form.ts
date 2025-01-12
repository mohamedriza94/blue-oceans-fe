import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useLoginApi } from "./use-login-api";

export type TLoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const ZOD_LoginSchema: z.ZodType<TLoginPayload> = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
  rememberMe: z.boolean(),
});

export type FormValues = z.infer<typeof ZOD_LoginSchema>;

export const useLoginForm = () => {
  const { mutate: PostLogin, ...loginApiData } = useLoginApi();

  const form = useForm<TLoginPayload>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: zodResolver(ZOD_LoginSchema),
  });

  const handleSubmit = (values: FormValues) => {
    PostLogin(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return { form, handleSubmit, ...loginApiData };
};
