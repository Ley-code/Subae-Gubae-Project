import type { Metadata } from "next";
import {
  Cardo,
  Cormorant_Garamond,
  IM_Fell_English_SC,
  Noto_Serif_Ethiopic,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  variable: "--font-noto-serif-ethiopic",
  subsets: ["latin", "ethiopic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const imFellEnglishSC = IM_Fell_English_SC({
  variable: "--font-im-fell-english-sc",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "መሠረተ ሃይማኖት ሰንበት ትምህርት ቤት",
  description:
    "ታዕካ ነገሥት በአታ ለማርያም ገዳም መሠረተ ሃይማኖት ሰንበት ትምህርት ቤት — የጸሎት፣ የትምህርት እና የመዝሙር ማዕከል።",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="am"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${notoSerifEthiopic.variable} ${cormorantGaramond.variable} ${cardo.variable} ${imFellEnglishSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div className="antique-ground" aria-hidden="true">
          <div className="antique-ground__texture" />
          <div className="antique-ground__vignette" />
        </div>
        <div
          className="antique-thorn-rail"
          style={{ left: "-160px" }}
          aria-hidden="true"
        />
        <div
          className="antique-thorn-rail"
          style={{ right: "-160px", transform: "scaleX(-1)" }}
          aria-hidden="true"
        />

        <NextIntlClientProvider messages={messages}>
          <SessionProviderWrapper>
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SessionProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
