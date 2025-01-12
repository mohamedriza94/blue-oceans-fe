import { protectedPaths } from "@/shared/constants/paths";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: protectedPaths.dashboard,
      permanent: process.env.NODE_ENV === "development" ? false : true,
    },
  };
};

export default function Home() {
  return null;
}
