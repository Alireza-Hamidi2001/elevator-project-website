"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { estedad, parastoo } from "../layout";

const navigations = [
    { id: 1, href: "صفحه اصلی", link: "/" },
    { id: 2, href: "درباره ما", link: "/about" },
    { id: 3, href: "ارتباط با ما", link: "/contact" },
    { id: 4, href: "خدمات", link: "/services" },

];

function Navigation() {
    const pathName = usePathname();
    return (
        <ul className={`${parastoo.className}  flex gap-2 text-[1rem]`}>
            {navigations.map((navigation) => (
                <Link
                    key={navigation.id}
                    href={`${navigation.link}`}
                    className={`flex items-center gap-1 transition-all duration-300  p-[1rem] ${
                        pathName === navigation.link
                            ? "text-night/700 dark:text-cream-50"
                            : "text-night-700/50 dark:text-cream-50/50"
                    }`}
                >
                    <li className={`${estedad.className}`}>
                        {navigation.href}
                    </li>
                </Link>
            ))}
        </ul>
    );
}

export default Navigation;
