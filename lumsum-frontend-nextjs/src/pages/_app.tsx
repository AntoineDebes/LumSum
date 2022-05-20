import App from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../libs/apollo-client";
import MainLayout from "../layouts/MainLayout";
import "antd/dist/antd.css";
import "../styles/globals.scss";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo }: any = this.props;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apollo}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
