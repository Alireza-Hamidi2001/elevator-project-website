"use client";
import { useState } from "react";
import { estedad, parastoo } from "../_fonts/fonts";

const navigations = [
    { id: 1, label: "صفحه اصلی", target: "home" },
    { id: 2, label: "درباره ما", target: "about" },
    { id: 3, label: "ارتباط با ما", target: "contact" },
    { id: 4, label: "خدمات", target: "services" },
];

function Navigation() {
    const [active, setActive] = useState("home");

    const handleScroll = (e, id) => {
        e.preventDefault();
        setActive(id);
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <ul className={`${parastoo.className} flex gap-2 text-[1rem]`}>
            {navigations.map((nav) => (
                <li key={nav.id}>
                    <a
                        href={`#${nav.target}`}
                        onClick={(e) => handleScroll(e, nav.target)}
                        className={`flex items-center gap-1 transition-all duration-300 p-[1rem] ${
                            estedad.className
                        } ${
                            active === nav.target
                                ? "text-night-700 dark:text-cream-50"
                                : "text-night-700/50 dark:text-cream-50/50"
                        }`}
                    >
                        {nav.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Navigation;
