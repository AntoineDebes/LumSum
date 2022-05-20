import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Layout from "@/layout/Layout";
import "@/styles/index.css";
import GlobalStyle from "@/styles/Global";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {Component.getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionProvider>
    )
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout footer>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
