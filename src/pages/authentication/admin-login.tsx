import { AdminLoginForm } from "@/components/admin-login/login-form";
import Head from "next/head";

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <AdminLoginForm />
    </>
  );
}
