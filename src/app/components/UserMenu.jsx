// app/components/UserMenu.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { toast } from "@/app/components/toast";
import { logoutAction } from "../login/actions";
import { estedad } from "../_fonts/fonts";
import Link from "next/link";
import { dashboardHome } from "@/lib/routes";
import { FaUser } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function UserMenu({ profile }) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const ref = useRef(null);
    const router = useRouter();

    // بستن منو وقتی بیرون کلیک شد
    useEffect(() => {
        function onClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    async function handleLogout() {
        setPending(true);
        const res = await logoutAction();
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
            return;
        }

        setConfirmOpen(false);
        toast.success("با موفقیت خارج شدید");
        router.push("/login");
        router.refresh();
    }

    const initial = profile?.first_name?.[0] ?? "؟";
    const fullName = `${profile?.first_name ?? ""} ${
        profile?.last_name ?? ""
    }`.trim();

    return (
        <>
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

                {open && (
                    <div
                        className={`${estedad.className} absolute right-0 mt-2 w-62 bg-white dark:bg-night-800 rounded-lg shadow-lg border border-night-700/10 dark:border-cream-50/10 overflow-hidden`}
                    >
                        <div className="px-4 py-3">
                            <p className="flex items-center gap-2 text-sm font-medium text-night-900/75 dark:text-cream-50/75">
                                <FaUser />
                                {fullName || "کاربر"}
                                <span className="text-xs text-night-700/60 dark:text-cream-50/60">
                                    ({" "}
                                    {profile?.role === "admin"
                                        ? "مدیر"
                                        : "کاربر"}{" "}
                                    )
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

                        <button
                            onClick={() => {
                                setOpen(false);
                                setConfirmOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                            <LuLogOut />
                            خروج از حساب
                        </button>
                    </div>
                )}
            </div>

            <LogoutConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleLogout}
                pending={pending}
            />
        </>
    );
}
