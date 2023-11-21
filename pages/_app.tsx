import "assets/globalStyles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { defaultTheme } from "../components/themes/defaultTheme";
import { GlobalStyle } from "../components/themes/globalStyle";
import NavigationBottomContainer from "containers/navigation-bottom/navigation-bottom";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useLocalStorage("theme", defaultTheme);
  const {pathname} = useRouter();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        ></meta>
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} /> 
        {
          !(pathname.includes('onboard') || pathname.includes('checkin-checkout')) &&<NavigationBottomContainer/>
        }
      </ThemeProvider>
    </>
  );
}
export default MyApp;
