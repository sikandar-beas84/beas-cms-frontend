// pages/_app.js
import App from 'next/app';
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from './component/Header';
import Footer from './component/Footer';
import HomeService from "./services/Home";

const inter = Inter({ subsets: ["latin"] });

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    let homeData = null;
    try {
    // fetch homeData
    const homesection = await HomeService.homePage();
    homeData = homesection.data;
  } catch (error) {
    console.error("Failed to load home data:", error.message);
    homeData = null;
  }
    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        homeData, // inject into pageProps
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <div className={inter.className}>
        <section className="top-bg">
          <Header homeData={pageProps.homeData} />
        </section>
        <Component {...pageProps} />
        <Footer homeData={pageProps.homeData} />
      </div>
      </>
    );
  }
}

export default MyApp;



///////////////--old--///////////////////////
// import { Inter } from "next/font/google";
// import Head from 'next/head';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import Header from './component/Header';
// import Footer from './component/Footer';

// const inter = Inter({ subsets: ["latin"] });

// export default function App({ Component, pageProps }) {
//   return (
//     <html lang="en">
//       <link rel="stylesheet" href="/assets/css/styles.css" precedence="default" />
//       <body className={inter.className}>
//       <section className="top-bg">
//         <Header homeData={pageProps.homeData} />
//       </section>
//       <Component {...pageProps} />
//       <Footer homeData={pageProps.homeData}/>
//         </body>
//     </html>
//   );
// }
