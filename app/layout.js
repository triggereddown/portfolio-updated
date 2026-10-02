import { fontDisplay, fontBody, fontMono, fontCormorant } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/layout/ProgressBar";
import Noise from "@/components/ui/Noise";
import CustomCursor from "@/components/ui/CustomCursor";
import { siteSettings } from "@/lib/mockData";

export const metadata = {
  metadataBase: new URL("https://deepmoitra.dev"),
  title: siteSettings.seo.metaTitle,
  description: siteSettings.seo.metaDescription,
  keywords: siteSettings.seo.keywords,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://deepmoitra.dev",
    title: siteSettings.seo.metaTitle,
    description: siteSettings.seo.metaDescription,
    siteName: "Deep Moitra Portfolio",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.seo.metaTitle,
    description: siteSettings.seo.metaDescription,
    images: ["/og-default.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} ${fontCormorant.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-bg-primary text-text-primary font-body flex flex-col min-h-screen">
        {/* Film grain noise system */}
        <Noise />

        {/* Dynamic Desktop custom cursor */}
        <CustomCursor />

        {/* Vertical scrolling character journey tracker */}
        <ProgressBar />

        {/* Global sticky header Navigation */}
        <Navbar />

        {/* Main Route Content */}
        <main className="flex-grow flex flex-col">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
