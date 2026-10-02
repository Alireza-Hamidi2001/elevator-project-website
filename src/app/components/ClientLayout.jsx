"use client";

import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import UpBtn from "./UpBtn";

export default function ClientLayout({ children }) {
    return (
        <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <UpBtn />
        </ThemeProvider>
    );
}
