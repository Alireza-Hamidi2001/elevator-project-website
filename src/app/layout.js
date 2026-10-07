import { Almarai, Estedad, Lalezar, Parastoo } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import UpBtn from "./components/UpBtn";
import { estedad } from "./_fonts/fonts";

// export const metadata = {
//     title: {
//         default: "درخشان آبادیس آسانبر",
//         template: "%s | درخشان آبادیس آسانبر",
//     },
// };

export default function RootLayout({ children }) {
    return (
        <html
            suppressHydrationWarning
            lang="fa"
            dir="rtl"
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
