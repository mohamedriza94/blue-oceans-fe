import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useChiefOccupantLoginApi } from "./use-chief-occupant-login-api";

export type TChiefOccupantLoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const ZOD_ChiefOccupantLoginSchema: z.ZodType<TChiefOccupantLoginPayload> = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
  rememberMe: z.boolean(),
});

export type FormValues = z.infer<typeof ZOD_ChiefOccupantLoginSchema>;

export const useChiefOccupantLoginForm = () => {
  const { mutate: PostLogin, ...chiefOccupantLoginApiData } = useChiefOccupantLoginApi();

  const form = useForm<TChiefOccupantLoginPayload>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: zodResolver(ZOD_ChiefOccupantLoginSchema),
  });

  const handleSubmit = (values: FormValues) => {
    PostLogin(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return { form, handleSubmit, ...chiefOccupantLoginApiData };
};
