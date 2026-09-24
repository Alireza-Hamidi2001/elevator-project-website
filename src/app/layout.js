import { Almarai, Estedad, Parastoo } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import UpBtn from "./UpBtn";

export const parastoo = Parastoo({
    variable: "--font-parastoo",
    subsets: ["latin", "arabic"],
    weight: "400",
});

export const almarai = Almarai({
    variable: "--font-almarai",
    subsets: ["latin", "arabic"],
    weight: "400",
});

export const estedad = Estedad({
    variable: "--font-estedad",
    subsets: ["latin", "arabic"],
    weight: "400",
});

export default function RootLayout({ children }) {
    return (
        <html
            lang="fa"
            dir="rtl"
            suppressHydrationWarning
            className={`${estedad.className} h-full antialiased`}>
            <body className="relative min-h-full flex flex-col bg-cream-50 text-night-950 dark:bg-night-950 dark:text-cream-50">
                <ThemeProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <UpBtn />
                </ThemeProvider>
            </body>
        </html>
    );
}
