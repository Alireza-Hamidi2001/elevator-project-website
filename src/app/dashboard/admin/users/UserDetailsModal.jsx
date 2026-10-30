// app/dashboard/admin/users/UserDetailsModal.jsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
    FaUser,
    FaTimes,
    FaCheck,
    FaPhone,
    FaIdCard,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBriefcase,
    FaVenusMars,
    FaRegCopy,
} from "react-icons/fa";
import { fetchUserDetailsAction } from "./actions";
import SpinnerMini from "@/app/components/SpinnerMini";
import PersianNumber from "@/app/components/PersianNumber";
import { estedad } from "@/app/_fonts/fonts";

// ────────────────────────────────────────────────────────
// ثابت‌ها و توابع کمکی
// ────────────────────────────────────────────────────────
const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
});

const GENDER_LABELS = { male: "مرد", female: "زن" };

const ROLE_STYLES = {
    admin: {
        label: "مدیر",
        className:
            "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    },
    user: {
        label: "کاربر",
        className:
            "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    },
};

const TONE_TEXT = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
    red: "text-red-600 dark:text-red-400",
    slate: "text-night-700/70 dark:text-cream-50/70",
};

const faNumber = (n) => n.toLocaleString("fa-IR");

function formatDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

function getContractState(startValue, endValue) {
    if (!startValue || !endValue) return null;

    const start = new Date(startValue).getTime();
    const end = new Date(endValue).getTime();
    const now = Date.now();

    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return null;

    if (now < start) {
        const days = Math.ceil((start - now) / DAY_MS);
        return {
            tone: "slate",
            label: "شروع نشده",
            note: `${faNumber(days)} روز تا شروع`,
        };
    }

    if (now > end) {
        const days = Math.floor((now - end) / DAY_MS);
        return {
            tone: "red",
            label: "منقضی شده",
            note: days === 0 ? "امروز تمام شد" : `${faNumber(days)} روز پیش`,
        };
    }

    const daysLeft = Math.ceil((end - now) / DAY_MS);
    return {
        tone: daysLeft <= 30 ? "amber" : "emerald",
        label: daysLeft <= 30 ? "رو به پایان" : "فعال",
        note: `${faNumber(daysLeft)} روز مانده`,
    };
}

// ────────────────────────────────────────────────────────
// ۱. کامپوننت اصلی (فقط مسئول نمایش مودال)
// ────────────────────────────────────────────────────────
export default function UserDetailsModal({ userId, open, onClose }) {
    if (!open) return null;

    return (
        <ModalWrapper onClose={onClose}>
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
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            dir="rtl"
        >
            <div
                onClick={onClose}
                aria-hidden="true"
                className="absolute inset-0 bg-night-950/50 backdrop-blur-md"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="جزئیات کاربر"
                className={`${estedad.className} relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-night-700/10 bg-white shadow-2xl shadow-night-950/30 animate-[popIn_200ms_ease-out] motion-reduce:animate-none dark:border-cream-50/10 dark:bg-night-800`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="بستن"
                    className="absolute left-4 top-4 z-20 rounded-full bg-white/60 p-2 text-night-700/70 backdrop-blur-sm transition hover:bg-white hover:text-night-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-night-900/50 dark:text-cream-50/70 dark:hover:bg-night-900 dark:hover:text-cream-50"
                >
                    <FaTimes className="h-4 w-4" />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
}

// ────────────────────────────────────────────────────────
// ۳. محتوای مودال (دریافت دیتا + UI)
// ────────────────────────────────────────────────────────
function UserDetailsContent({ userId, onClose }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

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
            } catch {
                if (!ignore) setError("خطا در دریافت اطلاعات.");
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };
    }, [userId, attempt]);

    function retry() {
        setError(null);
        setLoading(true);
        setAttempt((n) => n + 1);
    }

    if (loading) {
        return (
            <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 p-10">
                <SpinnerMini />
                <span className="text-sm text-night-700/60 dark:text-cream-50/60">
                    در حال دریافت اطلاعات...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 p-10 text-center">
                <p className="text-sm text-red-500">{error}</p>
                <button
                    type="button"
                    onClick={retry}
                    className="rounded-xl border border-night-700/15 px-5 py-2 text-sm font-medium text-night-900 transition hover:bg-night-700/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-cream-50/15 dark:text-cream-50 dark:hover:bg-cream-50/10"
                >
                    تلاش دوباره
                </button>
            </div>
        );
    }

    if (!profile) return null;

    const role = ROLE_STYLES[profile.role] ?? ROLE_STYLES.user;
    const isActive = Boolean(profile.is_active);
    const fullName = `${profile.first_name ?? ""} ${
        profile.last_name ?? ""
    }`.trim();
    const initials = `${profile.first_name?.[0] ?? ""}${
        profile.last_name?.[0] ?? ""
    }`.trim();

    // آمار بالای مودال؛ برای کاربر عادی قرارداد، برای مدیر نقش و وضعیت حساب
    const contract =
        profile.role === "user"
            ? getContractState(
                  profile.contract_start_date,
                  profile.contract_end_date,
              )
            : null;

    const stats =
        profile.role === "user"
            ? [
                  {
                      label: "تاریخ عضویت",
                      value: formatDate(profile.created_at),
                  },
                  {
                      label: "شروع قرارداد",
                      value: formatDate(profile.contract_start_date),
                  },
                  {
                      label: "پایان قرارداد",
                      value: formatDate(profile.contract_end_date),
                  },
                  {
                      label: "وضعیت قرارداد",
                      value: contract?.label,
                      note: contract?.note,
                      tone: contract?.tone,
                  },
              ]
            : [
                  {
                      label: "تاریخ عضویت",
                      value: formatDate(profile.created_at),
                  },
                  { label: "نقش", value: role.label },
                  {
                      label: "وضعیت حساب",
                      value: isActive ? "فعال" : "غیرفعال",
                      tone: isActive ? "emerald" : "red",
                  },
              ];

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
                {/* بنر */}
                <div
                    aria-hidden="true"
                    className="relative h-28 overflow-hidden bg-gradient-to-l from-violet-200 via-pink-100 to-sky-200 sm:h-32 dark:from-violet-900/50 dark:via-fuchsia-900/30 dark:to-sky-900/50"
                >
                    <div className="absolute -top-10 right-8 h-32 w-52 rounded-full bg-white/70 blur-2xl dark:bg-white/10" />
                    <div className="absolute -bottom-12 left-1/3 h-28 w-60 rounded-full bg-white/60 blur-2xl dark:bg-white/10" />
                    <div className="absolute -top-6 left-6 h-24 w-40 rounded-full bg-pink-200/70 blur-2xl dark:bg-fuchsia-400/20" />
                </div>

                <div className="px-6 pb-2 sm:px-8">
                    {/* آواتار + دکمه‌های سریع */}
                    <div className="relative -mt-12 flex items-end justify-between gap-3">
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-2xl font-bold text-blue-600 shadow-lg ring-4 ring-white dark:bg-blue-900/50 dark:text-blue-300 dark:ring-night-800">
                                {profile.avatar_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={profile.avatar_url}
                                        alt={fullName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : initials ? (
                                    <span aria-hidden="true">{initials}</span>
                                ) : (
                                    <FaUser
                                        className="h-9 w-9"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                            <span
                                title={isActive ? "فعال" : "غیرفعال"}
                                className={`absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white ring-2 ring-white dark:ring-night-800 ${
                                    isActive ? "bg-emerald-500" : "bg-red-500"
                                }`}
                            >
                                {isActive ? (
                                    <FaCheck className="h-2.5 w-2.5" />
                                ) : (
                                    <FaTimes className="h-2.5 w-2.5" />
                                )}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 pb-1">
                            {profile.phone && (
                                <QuickAction
                                    href={`tel:${profile.phone}`}
                                    icon={FaPhone}
                                >
                                    تماس
                                </QuickAction>
                            )}
                            {profile.email && (
                                <QuickAction
                                    href={`mailto:${profile.email}`}
                                    icon={FaEnvelope}
                                >
                                    ایمیل
                                </QuickAction>
                            )}
                        </div>
                    </div>

                    {/* نام و برچسب‌ها */}
                    <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-bold text-night-900 dark:text-cream-50">
                                {fullName || "—"}
                            </h2>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    isActive
                                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                        : "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        isActive
                                            ? "bg-emerald-500"
                                            : "bg-red-500"
                                    }`}
                                />
                                {isActive ? "فعال" : "غیرفعال"}
                            </span>
                            <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${role.className}`}
                            >
                                {role.label}
                            </span>
                        </div>
                        {profile.job_title && (
                            <p className="mt-1.5 text-sm text-night-700/60 dark:text-cream-50/60">
                                {profile.job_title}
                            </p>
                        )}
                    </div>

                    {/* آمار */}
                    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-b border-night-700/10 pb-5 sm:flex dark:border-cream-50/10">
                        {stats.map((stat) => (
                            <Stat
                                key={stat.label}
                                {...stat}
                            />
                        ))}
                    </div>

                    {/* فیلدها */}
                    <div className="divide-y divide-night-700/10 dark:divide-cream-50/10">
                        <FieldRow label="نام و نام خانوادگی">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <FieldBox>{profile.first_name}</FieldBox>
                                <FieldBox>{profile.last_name}</FieldBox>
                            </div>
                        </FieldRow>

                        <FieldRow label="ایمیل">
                            <FieldBox
                                icon={FaEnvelope}
                                ltr
                                copyValue={profile.email}
                            >
                                {profile.email}
                            </FieldBox>
                        </FieldRow>

                        <FieldRow label="شماره موبایل">
                            <FieldBox
                                icon={FaPhone}
                                ltr
                                copyValue={profile.phone}
                            >
                                {profile.phone ? (
                                    <PersianNumber value={profile.phone} />
                                ) : null}
                            </FieldBox>
                        </FieldRow>

                        <FieldRow label="کد ملی">
                            <FieldBox
                                icon={FaIdCard}
                                copyValue={profile.national_id}
                            >
                                {profile.national_id ? (
                                    <PersianNumber
                                        value={profile.national_id}
                                    />
                                ) : null}
                            </FieldBox>
                        </FieldRow>

                        <FieldRow label="جنسیت">
                            <FieldBox icon={FaVenusMars}>
                                {GENDER_LABELS[profile.gender]}
                            </FieldBox>
                        </FieldRow>

                        <FieldRow label="سمت / شغل">
                            <FieldBox icon={FaBriefcase}>
                                {profile.job_title}
                            </FieldBox>
                        </FieldRow>

                        <FieldRow label="آدرس">
                            <FieldBox
                                icon={FaMapMarkerAlt}
                                multiline
                            >
                                {profile.address}
                            </FieldBox>
                        </FieldRow>
                    </div>
                </div>
            </div>

            {/* فوتر */}
            <div className="flex shrink-0 justify-end border-t border-night-700/10 px-6 py-4 sm:px-8 dark:border-cream-50/10">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-night-700/15 bg-white px-6 py-2 text-sm font-medium text-night-900 shadow-sm transition hover:bg-cream-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-cream-50/15 dark:bg-night-900/60 dark:text-cream-50 dark:hover:bg-night-900"
                >
                    بستن
                </button>
            </div>
        </div>
    );
}

// ────────────────────────────────────────────────────────
// ۴. اجزای کوچک UI
// ────────────────────────────────────────────────────────
function QuickAction({ href, icon: Icon, children }) {
    return (
        <a
            href={href}
            className="inline-flex items-center gap-2 rounded-xl border border-night-700/15 bg-white px-3.5 py-2 text-sm font-medium text-night-900 shadow-sm transition hover:bg-cream-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-cream-50/15 dark:bg-night-900/60 dark:text-cream-50 dark:hover:bg-night-900"
        >
            <Icon
                className="h-3.5 w-3.5 opacity-70"
                aria-hidden="true"
            />
            {children}
        </a>
    );
}

function Stat({ label, value, note, tone }) {
    return (
        <div className="min-w-0 sm:flex-1 sm:border-s sm:border-night-700/10 sm:ps-4 sm:first:border-s-0 sm:first:ps-0 dark:sm:border-cream-50/10">
            <p className="text-xs text-night-700/55 dark:text-cream-50/55">
                {label}
            </p>
            <p
                className={`mt-1 text-sm font-semibold ${
                    value
                        ? TONE_TEXT[tone] ?? "text-night-900 dark:text-cream-50"
                        : "text-night-700/40 dark:text-cream-50/40"
                }`}
            >
                {value || "—"}
            </p>
            {note && (
                <p className="mt-0.5 text-xs text-night-700/55 dark:text-cream-50/55">
                    {note}
                </p>
            )}
        </div>
    );
}

function FieldRow({ label, children }) {
    return (
        <div className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:py-5">
            <span className="text-sm font-medium text-night-800 sm:pt-2.5 dark:text-cream-50/90">
                {label}
            </span>
            <div className="min-w-0">{children}</div>
        </div>
    );
}

function FieldBox({ icon: Icon, ltr, multiline, copyValue, children }) {
    const isEmpty =
        children === null || children === undefined || children === "";

    return (
        <div
            className={`flex gap-2.5 rounded-xl border border-night-700/10 bg-cream-50/50 px-3.5 py-2.5 shadow-sm dark:border-cream-50/10 dark:bg-night-900/50 ${
                multiline ? "items-start" : "items-center"
            }`}
        >
            {Icon && (
                <Icon
                    className={`h-4 w-4 shrink-0 text-night-700/50 dark:text-cream-50/50 ${
                        multiline ? "mt-1" : ""
                    }`}
                    aria-hidden="true"
                />
            )}
            <span
                dir={ltr && !isEmpty ? "ltr" : undefined}
                className={`min-w-0 flex-1 break-words text-sm leading-6 ${
                    ltr && !isEmpty ? "text-right" : ""
                } ${
                    isEmpty
                        ? "text-night-700/40 dark:text-cream-50/40"
                        : "text-night-900 dark:text-cream-50"
                }`}
            >
                {isEmpty ? "—" : children}
            </span>
            {copyValue && <CopyButton value={copyValue} />}
        </div>
    );
}

function CopyButton({ value }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(String(value));
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
        } catch {}
    }, [value]);

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? "کپی شد" : "کپی"}
            title={copied ? "کپی شد" : "کپی"}
            className="shrink-0 rounded-lg p-1.5 text-night-700/50 transition hover:bg-night-700/5 hover:text-night-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-cream-50/50 dark:hover:bg-cream-50/10 dark:hover:text-cream-50"
        >
            {copied ? (
                <FaCheck className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
                <FaRegCopy className="h-3.5 w-3.5" />
            )}
        </button>
    );
}
