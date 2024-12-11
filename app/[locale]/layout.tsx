import React from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import Image from "next/image";
import Head from "next/head";
import cricle from "@/public/cricle.png";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Ad from "@/components/Ad";
import PopupManager from "@/components/PopupManager";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Enjoy Games",
  description: "Store",
  image: "../public/svg/logo.svg",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html
        lang="en"
        className="bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff]"
      >
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />
        </Head>
        <body className="relative">
          <Ad />
          <Navbar />
          <ModalProvider />
          <ToastProvider />
          <Image
            src={cricle}
            alt="circle"
            className="absolute -top-20 right-6 rotate-90 z-0"
          />
          <main className="flex-1 z-10">{children}</main>
          <Footer />
          {/* Client-side popup manager */}
          <PopupManager />
          <WhatsAppButton />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
