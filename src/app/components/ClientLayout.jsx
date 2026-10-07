"use client";

import Header from "./Header";
import UpBtn from "./UpBtn";
import ContactModal from "./ContactModal";

export default function LayoutClient({ children }) {
    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <UpBtn />
            <ContactModal />
        </>
    );
}
