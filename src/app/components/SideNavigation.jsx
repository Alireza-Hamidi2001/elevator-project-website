"use client";

import { GoHome } from "react-icons/go";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { LuMessageSquare } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RiInbox2Fill } from "react-icons/ri";

const navLinks = [
    {
        name: "داشبورد",
        href: "/dashboard",
        icon: <GoHome className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "قوانین و مقررات",
        href: "/dashboard/rules",
        icon: <IoDocumentTextOutline className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "کاربران",
        href: "/dashboard/users",
        icon: <HiMiniUsers className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "گزارشات",
        href: "/dashboard/reports",
        icon: <TbReportSearch className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "تیکت",
        href: "/dashboard/tickets",
        icon: <LuMessageSquare className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "صندوق ورودی",
        href: "/dashboard/inbox",
        icon: <RiInbox2Fill className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "ثبت نام جدید",
        href: "/dashboard/register",
        icon: <FaUserPlus className="h-5 w-5 text-primary-600" />,
    },
];

function SideNavigation() {
    const pathName = usePathname();
    console.log(pathName);
    return (
        <nav className="py-4 bg-white dark:bg-night-900 shadow-sm min-h-[calc(100vh-4rem)]">
            <ul className="flex flex-col gap-4 h-full text-[1rem]">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            className={`px-4 hover:text-night-700 dark:hover:text-cream-50 transition-colors flex items-center gap-2 ${
                                pathName === link.href
                                    ? "text-night-700 dark:text-cream-50 font-semibold"
                                    : "text-night-700/70 dark:text-cream-50/50"
                            }`}
                            href={link.href}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideNavigation;
