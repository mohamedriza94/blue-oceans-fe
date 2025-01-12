import { mantineTheme } from "@/shared/config/mantine/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { ModalsProvider } from "@mantine/modals";
import { PageLoader } from "@/shared/components/page-loader";
import { Layout } from "@/layouts/layout";

import "@mantine/dropzone/styles.css";
import "../shared/styles/global.scss";
import "../shared/styles/custom-rich-text-editor.scss";
import "../shared/styles/menu-items.scss";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const isErrorPage = pageProps?.statusCode && pageProps.statusCode !== 200;

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={mantineTheme}>
        <ModalsProvider>
          <PageLoader />
          <Notifications />
          {isErrorPage ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
