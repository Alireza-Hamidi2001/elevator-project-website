import { almarai } from "@/app/layout";
import UserActions from "./UserActions";
import { FaVenusMars, FaIdCard, FaPhone, FaEnvelope } from "react-icons/fa";

export default function UserCard({ user }) {
    const fullName = `${user.firstName} ${user.lastName}`;
    const initial = user.firstName?.charAt(0) || "?";
    const isMale = user.gender === "male";

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* هدر: آواتار + نام + بج‌ها */}
            <div className="relative z-10 flex items-start gap-4">
                <div
                    className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-inner transition-transform duration-500 group-hover:scale-105 ${
                        isMale
                            ? "bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                            : "bg-gradient-to-br from-pink-500/20 to-pink-500/5 text-pink-600 dark:text-pink-400 border border-pink-500/30"
                    }`}
                    aria-hidden="true"
                >
                    {initial}
                </div>

                <div className="flex-1 min-w-0">
                    <h3
                        className={`${almarai.className} text-base sm:text-lg font-bold truncate`}
                    >
                        {fullName}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {user.role || "کاربر"}
                        </span>
                        <span
                            className={`inline-flex items-center gap-1 text-[11px] sm:text-xs px-2 py-0.5 rounded-full border ${
                                user.status === "active"
                                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                    : "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
                            }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    user.status === "active"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                }`}
                            />
                            {user.status === "active" ? "فعال" : "غیرفعال"}
                        </span>
                    </div>
                </div>
            </div>

            {/* اطلاعات */}
            <ul className="relative z-10 mt-5 space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5 text-night-700/80 dark:text-cream-50/70">
                    <FaVenusMars className="shrink-0 text-night-700/40 dark:text-cream-50/40" />
                    <span className="text-night-700/60 dark:text-cream-50/50">
                        جنسیت:
                    </span>
                    <span className="font-medium">{isMale ? "مرد" : "زن"}</span>
                </li>

                <li className="flex items-center gap-2.5 text-night-700/80 dark:text-cream-50/70">
                    <FaIdCard className="shrink-0 text-night-700/40 dark:text-cream-50/40" />
                    <span className="text-night-700/60 dark:text-cream-50/50">
                        کد ملی:
                    </span>
                    <span
                        className="font-medium"
                        dir="ltr"
                    >
                        {user.nationalId}
                    </span>
                </li>

                <li className="flex items-center gap-2.5 text-night-700/80 dark:text-cream-50/70">
                    <FaPhone className="shrink-0 text-night-700/40 dark:text-cream-50/40" />
                    <span className="text-night-700/60 dark:text-cream-50/50">
                        تلفن:
                    </span>
                    <a
                        href={`tel:${user.phone}`}
                        dir="ltr"
                        className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        {user.phone}
                    </a>
                </li>

                {user.email && (
                    <li className="flex items-center gap-2.5 text-night-700/80 dark:text-cream-50/70 min-w-0">
                        <FaEnvelope className="shrink-0 text-night-700/40 dark:text-cream-50/40" />
                        <span className="text-night-700/60 dark:text-cream-50/50 shrink-0">
                            ایمیل:
                        </span>
                        <a
                            href={`mailto:${user.email}`}
                            dir="ltr"
                            className="font-medium truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {user.email}
                        </a>
                    </li>
                )}
            </ul>

            {/* اکشن‌ها */}
            <div className="relative z-10 mt-5 pt-5 border-t border-night-700/10 dark:border-cream-50/10 flex items-center justify-between gap-3 flex-wrap">
                <UserActions user={user} />
            </div>
        </article>
    );
}
