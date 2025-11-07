import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "@/styles/fonts.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lancrly | Effortless Freelance Portfolio & Link Page Builder",
  applicationName: "Lancrly",
  description: "Lancrly gives freelancers a professional portfolio website — no design skills needed. Create a sleek page to showcase your work, bio, and contact info in minutes. Perfect for freelancers who want to attract more clients beyond Upwork and Fiverr.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png"></link>
        <meta name="Lancrly"/>
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Lancrly",
            "url": "https://lancrly.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://lancrly.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        <Script
          id="ld-json-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lancrly",
              alternateName: "Lancrly.com",
              url: "https://lancrly.com",
            }),
          }}
        />
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lancrly",
            "url": "https://lancrly.com",
            "logo": "https://lancrly.com/favicon.png"
          })}
        </Script>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K0DWC1QSM6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K0DWC1QSM6');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${manrope.variable} antialiased`}
      >
        <Toaster position="top-right"/>
        {children}
      </body>
    </html>
  );
}
