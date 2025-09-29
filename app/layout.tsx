import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://svg-react.efinixit.com"),
  title: "SVG Component Generator | Convert SVG to React, Vue & Svelte Components",
  description: "Professional SVG to component converter. Generate React, Vue, and Svelte components from SVG files with syntax highlighting, TypeScript support, and PNG export. Built by Antlers Labs.",
  keywords: [
    "svg to react",
    "svg to vue", 
    "svg to svelte",
    "svg component generator",
    "react components",
    "vue components",
    "svelte components",
    "svg converter",
    "component generator",
    "typescript",
    "antlers labs"
  ],
  authors: [{ name: "Antlers Labs" }],
  creator: "Antlers Labs",
  publisher: "Antlers Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://svg-react.efinixit.com",
    siteName: "SVG Component Generator",
    title: "SVG Component Generator | Convert SVG to React, Vue & Svelte Components",
    description: "Professional SVG to component converter. Generate React, Vue, and Svelte components from SVG files with syntax highlighting, TypeScript support, and PNG export.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "SVG Component Generator - Convert SVG files to React, Vue, and Svelte components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@antlerslabs",
    creator: "@antlerslabs",
    title: "SVG Component Generator | Convert SVG to React, Vue & Svelte Components",
    description: "Professional SVG to component converter. Generate React, Vue, and Svelte components from SVG files with syntax highlighting, TypeScript support, and PNG export.",
    images: ["/image.png"],
  },
  alternates: {
    canonical: "https://svg-react.efinixit.com",
  },
  category: "technology",
  classification: "Developer Tools",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "SVG Component Generator",
    "application-name": "SVG Component Generator",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SVG Component Generator",
    "description": "Professional SVG to component converter. Generate React, Vue, and Svelte components from SVG files with syntax highlighting, TypeScript support, and PNG export.",
    "url": "https://svg-react.efinixit.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Antlers Labs",
      "url": "https://efinixit.com",
      "sameAs": [
        "https://twitter.com/antlerslabs",
        "https://github.com/antlerslabs"
      ]
    },
    "featureList": [
      "Convert SVG to React components",
      "Convert SVG to Vue components", 
      "Convert SVG to Svelte components",
      "TypeScript support",
      "Syntax highlighting",
      "PNG export",
      "SVG optimization"
    ],
    "screenshot": "https://svg-react.efinixit.com/image.png"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Instagram Meta Tags */}
        <meta property="og:image" content="/image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SVG Component Generator - Convert SVG files to React, Vue, and Svelte components" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SVG Component Generator" />
        <meta name="application-name" content="SVG Component Generator" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Additional Social Media Meta Tags */}
        <meta property="article:author" content="Antlers Labs" />
        <meta property="article:publisher" content="https://efinixit.com" />
        <meta name="twitter:image:alt" content="SVG Component Generator - Convert SVG files to React, Vue, and Svelte components" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
