import { ResetPasswordForm } from "@/components/authentication/reset-password/reset-password-form";
import Head from "next/head";

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <ResetPasswordForm />
    </>
  );
}
