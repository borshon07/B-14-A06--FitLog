import { Oswald, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";
import { PlanProvider } from "@/AllPlan/myplan";
import Footer from "@/Componants/Footerdom/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body className="bg-base-200 font-inter antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="fitlog-dark"
          themes={["fitlog-dark", "fitlog-light"]}
          enableSystem={false}
        >
          <div className="flex min-h-screen flex-col bg-base-200 text-base-content">
            <div className="flex-1">
              <PlanProvider>{children}</PlanProvider>
            </div>

            <Footer />
          </div>

          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
