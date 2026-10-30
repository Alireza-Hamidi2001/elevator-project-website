import {
    FaUser,
    FaPhone,
    FaIdCard,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
} from "react-icons/fa";
import { estedad } from "../_fonts/fonts";
import PersianNumber from "./PersianNumber";
import Link from "next/link";
import { MdHome } from "react-icons/md";

// ────────────────────────────────────────────────────────
// ثابت‌ها و توابع کمکی (بیرون از کامپوننت)
// ────────────────────────────────────────────────────────
const DAY_MS = 1000 * 60 * 60 * 24;

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
});

function formatDate(dateString) {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

// منطق قبلی: فقط برای کاربر عادی و وقتی تاریخ پایان قرارداد وجود دارد
// (progress فقط برای نمایش نوار پیشرفت اضافه شده است)
function getContractInfo(profile) {
    if (profile?.role !== "user" || !profile?.contract_end_date) {
        return { remainingDays: null, status: null, progress: null };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(profile.contract_end_date);
    endDate.setHours(0, 0, 0, 0);

    const remainingDays = Math.ceil((endDate - today) / DAY_MS);

    let status = "ok";
    if (remainingDays < 0) status = "expired";
    else if (remainingDays <= 30) status = "warning";

    let progress = null;
    if (profile.contract_start_date) {
        const startDate = new Date(profile.contract_start_date);
        startDate.setHours(0, 0, 0, 0);
        const total = endDate - startDate;
        if (total > 0) {
            progress = Math.min(
                100,
                Math.max(0, ((today - startDate) / total) * 100),
            );
        }
    }

    return { remainingDays, status, progress };
}

const CONTRACT_TONES = {
    expired: {
        badge: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300",
        bar: "bg-red-500",
    },
    warning: {
        badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        bar: "bg-amber-500",
    },
    ok: {
        badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        bar: "bg-emerald-500",
    },
};

// ────────────────────────────────────────────────────────
// کامپوننت اصلی
// ────────────────────────────────────────────────────────
export default function ProfileCard({ profile }) {
    const fullName =
        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
        "نام و نام خانوادگی";
    const isAdmin = profile?.role === "admin";
    const roleLabel = isAdmin ? "مدیر" : "کاربر";
    const isUser = profile?.role === "user";
    const isActive = profile?.is_active !== false;

    const { remainingDays, status, progress } = getContractInfo(profile);

    const infoItems = [
        {
            icon: FaPhone,
            label: "شماره تلفن",
            value: profile?.phone,
            ltr: true,
            numeric: true,
        },
        {
            icon: FaIdCard,
            label: "کد ملی",
            value: profile?.national_id,
            numeric: true,
        },
        { icon: FaEnvelope, label: "ایمیل", value: profile?.email, ltr: true },
        {
            icon: FaMapMarkerAlt,
            label: "آدرس",
            value: profile?.address,
            fullWidth: true,
        },
    ];

    return (
        <div
            className={`${estedad.className} overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm dark:border-night-700 dark:bg-night-800`}
        >
            {/* بنر */}
            <div className="relative h-28 overflow-hidden bg-linear-to-l from-violet-200 via-pink-100 to-sky-200 sm:h-36 dark:from-violet-900/50 dark:via-fuchsia-900/30 dark:to-sky-900/50">
                <div
                    aria-hidden="true"
                    className="absolute -top-10 right-8 h-32 w-52 rounded-full bg-white/70 blur-2xl dark:bg-white/10"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-12 left-1/3 h-28 w-60 rounded-full bg-white/60 blur-2xl dark:bg-white/10"
                />
                <div
                    aria-hidden="true"
                    className="absolute -top-6 left-6 h-24 w-40 rounded-full bg-pink-200/70 blur-2xl dark:bg-fuchsia-400/20"
                />

                <Link
                    href="/"
                    className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-night-800 backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:hidden dark:bg-night-900/50 dark:text-cream-50 dark:hover:bg-night-900"
                >
                    <MdHome
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                    صفحه اصلی
                </Link>
            </div>

            <div className="px-5 pb-6 sm:px-8 sm:pb-8">
                {/* آواتار + نام */}
                <div className="relative -mt-12 flex flex-col items-center gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-5">
                    <div className="relative shrink-0">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-3xl font-bold text-white shadow-lg shadow-blue-500/25 ring-4 ring-white sm:h-28 sm:w-28 dark:ring-night-800">
                            {profile?.avatar_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={profile.avatar_url}
                                    alt={fullName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                profile?.first_name?.[0] ?? (
                                    <FaUser aria-hidden="true" />
                                )
                            )}
                        </div>
                        <span
                            title={isActive ? "فعال" : "غیرفعال"}
                            className={`absolute bottom-1 left-1 h-5 w-5 rounded-full border-[3px] border-white dark:border-night-800 ${
                                isActive ? "bg-emerald-400" : "bg-red-400"
                            }`}
                        />
                    </div>

                    <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:pb-1 sm:text-right">
                        <h2 className="text-xl font-bold text-night-900 sm:text-2xl dark:text-cream-50">
                            {fullName}
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    isAdmin
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                                        : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                                }`}
                            >
                                {roleLabel}
                            </span>
                            {profile?.job_title && (
                                <span className="text-sm text-night-700/60 dark:text-cream-50/60">
                                    {profile.job_title}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-6 h-px w-full bg-linear-to-l from-transparent via-night-700/10 to-transparent dark:via-cream-50/10" />

                {/* اطلاعات */}
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {infoItems.map((item) => {
                        const Icon = item.icon;
                        const hasValue = Boolean(item.value);

                        return (
                            <div
                                key={item.label}
                                className={`flex items-start gap-3 rounded-2xl border border-night-700/5 bg-cream-50/60 p-3.5 dark:border-cream-50/5 dark:bg-night-900/50 ${
                                    item.fullWidth ? "sm:col-span-2" : ""
                                }`}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm dark:bg-night-800 dark:text-blue-400">
                                    <Icon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <dt className="text-xs text-night-700/55 dark:text-cream-50/55">
                                        {item.label}
                                    </dt>
                                    <dd
                                        dir={
                                            item.ltr && hasValue
                                                ? "ltr"
                                                : undefined
                                        }
                                        className={`mt-1 break-words text-sm font-medium leading-6 ${
                                            item.ltr && hasValue
                                                ? "text-right"
                                                : ""
                                        } ${
                                            hasValue
                                                ? "text-night-900 dark:text-cream-50"
                                                : "text-night-700/40 dark:text-cream-50/40"
                                        }`}
                                    >
                                        {!hasValue ? (
                                            "—"
                                        ) : item.numeric ? (
                                            <PersianNumber value={item.value} />
                                        ) : (
                                            item.value
                                        )}
                                    </dd>
                                </div>
                            </div>
                        );
                    })}
                </dl>

                {/* قرارداد (فقط برای کاربر عادی) */}
                {isUser && (
                    <section className="mt-4 rounded-2xl border border-night-700/5 bg-cream-50/60 p-4 sm:p-5 dark:border-cream-50/5 dark:bg-night-900/50">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-night-900 dark:text-cream-50">
                                <FaCalendarAlt
                                    className="h-4 w-4 text-blue-500 dark:text-blue-400"
                                    aria-hidden="true"
                                />
                                قرارداد
                            </h3>

                            {status && (
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${CONTRACT_TONES[status].badge}`}
                                >
                                    {status === "expired" ? (
                                        "قرارداد منقضی شده است"
                                    ) : (
                                        <>
                                            <PersianNumber
                                                value={remainingDays}
                                            />{" "}
                                            روز تا پایان قرارداد
                                        </>
                                    )}
                                </span>
                            )}
                        </div>

                        {progress !== null && (
                            <div
                                role="progressbar"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(progress)}
                                aria-label="پیشرفت زمان قرارداد"
                                className="mt-4 h-2 overflow-hidden rounded-full bg-night-700/10 dark:bg-cream-50/10"
                            >
                                <div
                                    className={`h-full rounded-full ${CONTRACT_TONES[status].bar}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}

                        <div className="mt-3 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs text-night-700/55 dark:text-cream-50/55">
                                    شروع قرارداد
                                </p>
                                <p className="mt-1 text-sm font-medium text-night-900 dark:text-cream-50">
                                    {formatDate(profile?.contract_start_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-night-700/55 dark:text-cream-50/55">
                                    پایان قرارداد
                                </p>
                                <p className="mt-1 text-sm font-medium text-night-900 dark:text-cream-50">
                                    {formatDate(profile?.contract_end_date)}
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
