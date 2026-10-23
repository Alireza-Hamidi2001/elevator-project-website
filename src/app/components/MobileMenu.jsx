// app/components/MobileMenu.jsx
"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { estedad } from "../_fonts/fonts";

const navigations = [
    // { id: 1, label: "صفحه اصلی", target: "home" },
    { id: 2, label: "درباره ما", target: "about" },
    { id: 3, label: "ارتباط با ما", target: "contact" },
    { id: 4, label: "خدمات", target: "services" },
];

function MobileMenu() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleScroll = (e, id) => {
        e.preventDefault();
        setActive(id);
        setOpen(false);
        setTimeout(() => {
            const elem = document.getElementById(id);
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const menu = (
        <>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-300
                            lg:hidden ${
                                open
                                    ? "opacity-100 pointer-events-auto"
                                    : "opacity-0 pointer-events-none"
                            }`}
            />

            <aside
                dir="rtl"
                className={`fixed top-0 right-0 z-[9999] h-dvh w-[75%] max-w-sm overflow-y-auto
                            bg-cream-50 dark:bg-night-900
                            shadow-2xl border-l border-night-700/10 dark:border-cream-50/10
                            transition-transform duration-300 ease-out
                            lg:hidden
                            ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-night-700/10 dark:border-cream-50/10">
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="بستن منو"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-night-700 dark:text-cream-50 hover:bg-night-700/10 dark:hover:bg-cream-50/10 transition-colors duration-300"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <ul className="flex flex-col p-4 gap-1">
                    {navigations.map((nav) => (
                        <li key={nav.id}>
                            <a
                                href={`#${nav.target}`}
                                onClick={(e) => handleScroll(e, nav.target)}
                                className={`block px-4 py-3 rounded-lg text-[1.05rem] transition-colors duration-300 ${
                                    estedad.className
                                } ${
                                    active === nav.target
                                        ? "text-night-700 dark:text-cream-50 font-bold"
                                        : "text-night-700/70 dark:text-cream-50/70 hover:text-night-700 dark:hover:text-cream-50"
                                }`}
                            >
                                {nav.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label="باز کردن منو"
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-night-700 dark:text-cream-50 hover:bg-night-700/10 dark:hover:bg-cream-50/10 transition-colors duration-300"
            >
                <FaBars size={22} />
            </button>

            {mounted && createPortal(menu, document.body)}
        </>
    );
}

export default MobileMenu;
