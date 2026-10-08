import BackgroundFX from "./(with-footer)/_about/BackgroundFX";
import { estedad } from "./_fonts/fonts";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import UpBtn from "./components/UpBtn";
import "./globals.css";

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
                    <BackgroundFX />
                    <main className="flex-1">{children}</main>
                    <UpBtn />
                </ThemeProvider>
            </body>
        </html>
    );
}
