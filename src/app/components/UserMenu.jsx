// app/components/UserMenu.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { estedad } from "../_fonts/fonts";
import Link from "next/link";
import { dashboardHome } from "@/lib/routes";
import { FaUser } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import LogoutButton from "./LogoutButton";

export default function UserMenu({ profile }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function onClickOutside(e) {
            // اگر کلیک روی backdrop مودال یا داخل مودال بود، منو رو نبند
            if (e.target.closest("[data-logout-modal]")) return;

            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    const initial = profile?.first_name?.[0] ?? "؟";
    const fullName = `${profile?.first_name ?? ""} ${
        profile?.last_name ?? ""
    }`.trim();

    return (
        <div
            ref={ref}
            className="relative"
        >
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                aria-label="منوی کاربر"
            >
                {initial}
            </button>

            {/* منو همیشه رندر میشه، فقط با CSS مخفی/نمایان میشه */}
            <div
                className={`${
                    estedad.className
                } absolute right-0 mt-2 w-62 bg-white dark:bg-night-800 rounded-lg shadow-lg border border-night-700/10 dark:border-cream-50/10 overflow-hidden transition-all duration-200 origin-top ${
                    open
                        ? "opacity-100 visible scale-y-100"
                        : "opacity-0 invisible scale-y-95 pointer-events-none"
                }`}
            >
                <div className="px-4 py-3">
                    <p className="flex items-center gap-2 text-sm font-medium text-night-900/75 dark:text-cream-50/75">
                        <FaUser />
                        {fullName || "کاربر"}
                        <span className="text-xs text-night-700/60 dark:text-cream-50/60">
                            ( {profile?.role === "admin" ? "مدیر" : "کاربر"} )
                        </span>
                    </p>
                </div>

                <Link
                    href={dashboardHome(profile?.role)}
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-night-900/75 hover:text-night-900 dark:text-cream-50/75 dark:hover:text-cream-50 transition"
                >
                    <RiDashboardFill />
                    پنل کاربری
                </Link>

                <LogoutButton onMenuClose={() => setOpen(false)} />
            </div>
        </div>
    );
}
