import { Toaster } from "sonner";
import BackgroundFX from "./(with-footer)/BackgroundFX";
import { estedad } from "./_fonts/fonts";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import UpBtn from "./components/UpBtn";
import "./globals.css";

export const metadata = {
    title: {
        default: "درخشان آبادیس آسانبر",
        template: "%s | درخشان آبادیس آسانبر",
    },
};

export default async function RootLayout({ children }) {
    return (
        <html
            suppressHydrationWarning
            lang="fa"
            dir="rtl"
            className={`${estedad.className} h-full antialiased`}>
            <body className="relative max-w-screen overflow-x-hidden min-h-full flex flex-col bg-cream-50 text-night-950 dark:bg-night-950 dark:text-cream-50">
                <ThemeProvider>
                    <BackgroundFX />
                    <main className="flex-1">
                        {children}
                        <Toaster
                            position="top-center"
                            dir="rtl"
                            toastOptions={{
                                duration: 4000,
                                classNames: {
                                    toast: `!rounded-sm !shadow-md !border !w-auto !min-w-[300px] !max-w-[90vw] ${estedad.className}`,
                                    title: "!font-medium !text-sm",
                                    description: "!text-sm !opacity-80",
                                    success:
                                        "!bg-emerald-50 !text-emerald-700 !border-emerald-200",
                                    error: "!bg-red-50 !text-red-700 !border-red-200",
                                    warning:
                                        "!bg-amber-50 !text-amber-700 !border-amber-200",
                                    info: "!bg-blue-50 !text-blue-700 !border-blue-200",
                                },
                            }}
                        />
                    </main>
                    <UpBtn />
                </ThemeProvider>
            </body>
        </html>
    );
}
