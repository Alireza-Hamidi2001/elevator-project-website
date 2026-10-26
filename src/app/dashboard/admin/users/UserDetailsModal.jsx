// app/dashboard/admin/users/UserDetailsModal.jsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    FaUser,
    FaTimes,
    FaPhone,
    FaIdCard,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBriefcase,
    FaCalendarAlt,
    FaVenusMars,
} from "react-icons/fa";
import { fetchUserDetailsAction } from "./actions";
import SpinnerMini from "@/app/components/SpinnerMini";
import PersianNumber from "@/app/components/PersianNumber";
import { estedad } from "@/app/_fonts/fonts";

// ────────────────────────────────────────────────────────
// ۱. کامپوننت اصلی (فقط مسئول نمایش مودال)
// ────────────────────────────────────────────────────────
export default function UserDetailsModal({ userId, open, onClose }) {
    if (!open) return null;

    return (
        <ModalWrapper onClose={onClose}>
            {/* با دادن key، وقتی userId عوض بشه، کامپوننت از نو ساخته میشه */}
            <UserDetailsContent
                userId={userId}
                onClose={onClose}
                key={userId}
            />
        </ModalWrapper>
    );
}

// ────────────────────────────────────────────────────────
// ۲. لایه بک‌دراپ (Portal)
// ────────────────────────────────────────────────────────
function ModalWrapper({ children, onClose }) {
    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            <div
                onClick={onClose}
                className="absolute inset-0 bg-night-950/40 backdrop-blur-md"
            />
            <div
                className={`${estedad.className} relative w-full max-w-2xl bg-white dark:bg-night-800 rounded-2xl shadow-xl border border-night-700/10 dark:border-cream-50/10 overflow-hidden animate-[popIn_200ms_ease-out]`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 z-10 p-2 bg-white/50 dark:bg-night-900/50 backdrop-blur-sm rounded-full text-night-700/70 hover:text-night-900 dark:text-cream-50/70 dark:hover:text-cream-50 transition"
                >
                    <FaTimes className="w-4 h-4" />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
}

// ────────────────────────────────────────────────────────
// ۳. محتوای مودال (فقط دیتا و UI)
// ────────────────────────────────────────────────────────
function UserDetailsContent({ userId, onClose }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    // فقط یک بار در زمان mount اجرا میشه (چون key عوض میشه)
    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await fetchUserDetailsAction(userId);
                if (ignore) return;

                if (res?.error) {
                    setError(res.error);
                } else {
                    setProfile(res.profile);
                }
            } catch (err) {
                if (!ignore) setError("خطا در دریافت اطلاعات.");
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        fetchData();

        return () => {
            ignore = true; // جلوگیری از setState بعد از unmount
        };
    }, [userId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <SpinnerMini />
                <span className="text-sm text-night-700/60 dark:text-cream-50/60">
                    در حال دریافت اطلاعات...
                </span>
            </div>
        );
    }

    if (error) {
        return <div className="p-20 text-center text-red-500">{error}</div>;
    }

    if (!profile) return null;

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Intl.DateTimeFormat("fa-IR", {
            calendar: "persian",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(dateString));
    };

    const genderLabel =
        profile.gender === "male"
            ? "مرد"
            : profile.gender === "female"
            ? "زن"
            : "—";

    const infoItems = [
        {
            icon: FaPhone,
            label: "شماره موبایل",
            value: <PersianNumber value={profile.phone} />,
            ltr: true,
        },
        {
            icon: FaIdCard,
            label: "کد ملی",
            value: <PersianNumber value={profile.national_id} />,
        },
        {
            icon: FaEnvelope,
            label: "ایمیل",
            value: profile.email || "—",
            ltr: true,
        },
        { icon: FaVenusMars, label: "جنسیت", value: genderLabel },
        {
            icon: FaBriefcase,
            label: "سمت / شغل",
            value: profile.job_title || "—",
        },
        {
            icon: FaMapMarkerAlt,
            label: "آدرس",
            value: profile.address || "—",
            fullWidth: true,
        },
        {
            icon: FaCalendarAlt,
            label: "تاریخ عضویت",
            value: formatDate(profile.created_at),
            fullWidth: true,
        },
    ];

    return (
        <div className="flex flex-col">
            {/* هدر */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cream-50 dark:from-blue-900/20 dark:to-night-800 p-6 sm:p-8 flex flex-col items-center gap-3 border-b border-night-700/5 dark:border-cream-50/5">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 overflow-hidden border-4 border-white dark:border-night-800 shadow-md">
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={`${profile.first_name} ${profile.last_name}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaUser className="w-10 h-10" />
                    )}
                </div>
                <h2 className="text-xl font-bold text-night-900 dark:text-cream-50 text-center">
                    {profile.first_name} {profile.last_name}
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {profile.role === "admin" ? "مدیر" : "کاربر"}
                </span>
            </div>

            {/* جزئیات */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                {infoItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`flex items-start gap-3 p-3 rounded-xl bg-cream-50 dark:bg-night-900 border border-night-700/5 dark:border-cream-50/5 ${
                                item.fullWidth ? "sm:col-span-2" : ""
                            }`}
                        >
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-night-800 shadow-sm flex items-center justify-center shrink-0 text-night-700/60 dark:text-cream-50/60">
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs text-night-700/50 dark:text-cream-50/50 mb-1">
                                    {item.label}
                                </span>
                                <span
                                    className="text-sm font-medium text-night-900 dark:text-cream-50 break-words"
                                    dir={item.ltr ? "ltr" : undefined}
                                >
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
