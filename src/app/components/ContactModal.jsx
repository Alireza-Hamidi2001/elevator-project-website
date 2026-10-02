"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaHeadset, FaTimes, FaArrowLeft } from "react-icons/fa";
import { contactItems } from "../_data/ContactModalVariable";
import { almarai, estedad } from "../layout";

/* انیمیشن‌ها داخل خود کامپوننت تعریف شده‌اند؛ نیازی به تغییر tailwind.config نیست */
const ANIMATIONS = `
@keyframes cm-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes cm-pop-in {
    from { opacity: 0; transform: translateY(24px) scale(.96) }
    to   { opacity: 1; transform: translateY(0) scale(1) }
}
@keyframes cm-rise {
    from { opacity: 0; transform: translateY(14px) }
    to   { opacity: 1; transform: translateY(0) }
}
@keyframes cm-float {
    0%, 100% { transform: translateY(0) }
    50%      { transform: translateY(-4px) }
}
@keyframes cm-wiggle {
    0%   { transform: scale(1) rotate(0) }
    30%  { transform: scale(1.3) rotate(-14deg) }
    55%  { transform: scale(1.25) rotate(10deg) }
    80%  { transform: scale(1.3) rotate(-5deg) }
    100% { transform: scale(1.25) rotate(0) }
}
@keyframes cm-ring {
    0%   { transform: scale(.7); opacity: .55 }
    100% { transform: scale(1.7); opacity: 0 }
}

.cm-backdrop { animation: cm-fade .3s ease-out both }
.cm-panel    { animation: cm-pop-in .45s cubic-bezier(.2,.9,.3,1.2) both }
.cm-item     { animation: cm-rise .5s ease-out both }
.cm-icon     { animation: cm-float 3.4s ease-in-out infinite }
.cm-link:hover .cm-icon,
.cm-link:focus-visible .cm-icon {
    animation: cm-wiggle .7s cubic-bezier(.34,1.56,.64,1) forwards;
}
.cm-ring     { animation: cm-ring 2.8s ease-out infinite }

@media (prefers-reduced-motion: reduce) {
    .cm-backdrop, .cm-panel, .cm-item, .cm-icon, .cm-ring,
    .cm-link:hover .cm-icon { animation: none !important }
}
`;

function ContactModal({ isOpen, onClose }) {
    // بستن با Escape + قفل اسکرول
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            dir="rtl"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="راه‌های ارتباطی"
        >
            <style>{ANIMATIONS}</style>

            {/* Backdrop */}
            <div
                onClick={onClose}
                className="cm-backdrop absolute inset-0 bg-night-950/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <div className="cm-panel relative w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-3xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 shadow-2xl shadow-night-950/25 dark:shadow-black/60">
                {/* دکمه بستن */}
                <button
                    onClick={onClose}
                    aria-label="بستن"
                    className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-night-700/60 dark:text-cream-50/60 transition-all duration-300 hover:rotate-90 hover:text-red-600 dark:hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                    <FaTimes className="text-xl" />
                </button>

                {/* هدر */}
                <div className="px-6 sm:px-8 pt-9 pb-6 text-center">
                    {/* آیکون هدر: بدون بک‌گراند، فقط حلقه‌های موج‌دار */}
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                        <span
                            aria-hidden="true"
                            className="cm-ring absolute inset-2 rounded-full border-2 border-blue-500/50"
                        />
                        <span
                            aria-hidden="true"
                            className="cm-ring absolute inset-2 rounded-full border-2 border-blue-500/50"
                            style={{ animationDelay: "1.4s" }}
                        />
                        <FaHeadset className="cm-icon relative text-5xl text-blue-600 dark:text-blue-400" />
                    </div>

                    <h2
                        className={`${almarai.className} mt-4 text-xl sm:text-2xl font-bold text-night-950 dark:text-cream-50`}
                    >
                        با ما در تماس باشید
                    </h2>   
                    <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-blue-600 dark:bg-blue-400" />
                </div>

                {/* آیتم‌های تماس */}
                <ul className="px-4 sm:px-6 pb-6 space-y-3">
                    {contactItems.map((item, i) => (
                        <li
                            key={item.id}
                            className="cm-item"
                            style={{ animationDelay: `${150 + i * 80}ms` }}
                        >
                            <Link
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cm-link group flex items-center gap-4 rounded-2xl border border-night-700/10 dark:border-cream-50/10 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors duration-300 hover:border-blue-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                            >
                                {/* آیکون: بزرگ، بدون بک‌گراند */}
                                <span
                                    className="cm-icon flex h-12 w-12 shrink-0 items-center justify-center text-4xl text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400 [&>svg]:h-9 [&>svg]:w-9"
                                    style={{ animationDelay: `${i * 0.35}s` }}
                                >
                                    {item.icon}
                                </span>

                                {/* متن */}
                                <div className="flex min-w-0 flex-1 flex-col text-right">
                                    <span
                                        className={`${almarai.className} text-sm sm:text-base font-bold text-night-950 dark:text-cream-50`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        dir="ltr"
                                        className={`${estedad.className} mt-0.5 truncate text-left text-xs sm:text-sm text-night-700/60 dark:text-cream-50/50 transition-colors duration-300 group-hover:text-night-700 dark:group-hover:text-cream-50`}
                                    >
                                        {item.value}
                                    </span>
                                </div>

                                {/* فلش که هنگام هاور به سمت چپ می‌لغزد */}
                                <FaArrowLeft
                                    aria-hidden="true"
                                    className="shrink-0 text-sm text-night-700/30 dark:text-cream-50/30 transition-all duration-300 group-hover:-translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ContactModal;
