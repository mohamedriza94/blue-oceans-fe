import React from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import Head from "next/head";
import { Stack } from "@mantine/core";
import { PageNotFoundError } from "@/components/error/404";
import { OtherError } from "@/components/error/other";

type ErrorProps = {
  statusCode?: number;
};

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>

      <Stack
        align="center"
        justify="center"
        h={"100vh"}
        w={"100vw"}
        bg={"white"}
      >
        {statusCode === 404 ? <PageNotFoundError /> : <OtherError />}
      </Stack>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
