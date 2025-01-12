import { ForgotPasswordForm } from "@/components/authentication/forgot-password/forgot-password-form";
import Head from "next/head";

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ForgotPasswordForm />
    </>
  );
}
