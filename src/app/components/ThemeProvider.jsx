"use client";

import { ThemeProvider as NextThemesProvider } from "@wrksz/themes/next";

export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}
