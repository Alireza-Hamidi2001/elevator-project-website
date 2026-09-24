"use client";

import { useEffect } from "react";
import {
    FaTelegramPlane,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
    FaMobileAlt,
    FaTimes,
    FaHeadset,
} from "react-icons/fa";
import { almarai, estedad } from "./layout";

function ContactModal({ isOpen, onClose }) {
    // بستن با کلید Escape + قفل اسکرول
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

    const contactItems = [
        {
            id: "telegram",
            label: "تلگرام",
            value: "@elevator_support",
            href: "https://t.me/elevator_support",
            icon: <FaTelegramPlane />,
        },
        {
            id: "instagram",
            label: "اینستاگرام",
            value: "@elevator_ir",
            href: "https://instagram.com/elevator_ir",
            icon: <FaInstagram />,
        },
        {
            id: "email",
            label: "ایمیل",
            value: "info@elevator.ir",
            href: "mailto:info@elevator.ir",
            icon: <FaEnvelope />,
        },
        {
            id: "mobile",
            label: "تلفن همراه",
            value: "۰۹۱۵ ۱۲۳ ۴۵۶۷",
            href: "tel:+989151234567",
            icon: <FaMobileAlt />,
        },
        {
            id: "phone",
            label: "تلفن ثابت",
            value: "۰۵۱ ۳۸۴۷ ۲۲۱۰",
            href: "tel:+985138472210",
            icon: <FaPhoneAlt />,
        },
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="راه‌های ارتباطی"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-night-950/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
            />

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-2xl border border-amber-100 dark:border-cream-50/10 bg-cream-50 dark:bg-night-900 shadow-2xl shadow-night-950/20 dark:shadow-black/60 animate-[slideUp_0.4s_ease-out] overflow-hidden">
                {/* خط گرادیان بالای مودال */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-night-700/30 dark:via-cream-50/30 to-transparent" />

                {/* دکمه بستن */}
                <button
                    onClick={onClose}
                    aria-label="بستن"
                    className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center text-night-700/60 dark:text-cream-50/60 bg-cream-100 dark:bg-night-950 border border-amber-100 dark:border-cream-50/10 hover:bg-night-700 dark:hover:bg-cream-50 hover:text-cream-50 dark:hover:text-night-950 hover:rotate-90 transition-all duration-300"
                >
                    <FaTimes className="text-lg" />
                </button>

                {/* هدر */}
                <div className="px-6 md:px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-night-700 dark:bg-cream-50 text-cream-50 dark:text-night-950 flex items-center justify-center mb-4">
                        <FaHeadset className="text-2xl" />
                    </div>
                    <h2
                        className={`${almarai.className} text-xl md:text-2xl font-bold text-night-950 dark:text-cream-50`}
                    >
                        با ما در تماس باشید
                    </h2>
                    
                    <div className="mt-4 h-1 w-16 bg-night-700 dark:bg-cream-50 rounded-full mx-auto" />
                </div>

                {/* آیتم‌های تماس */}
                <ul className="px-4 md:px-6 pb-6 space-y-2">
                    {contactItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-xl px-4 py-3 bg-cream-100/60 dark:bg-night-950/60 border border-amber-100 dark:border-cream-50/10 hover:bg-cream-100 dark:hover:bg-night-950 hover:border-night-700/20 dark:hover:border-cream-50/25 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {/* آیکون */}
                                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-base text-night-700 dark:text-cream-50 bg-cream-50 dark:bg-night-900 border border-amber-100 dark:border-cream-50/10 group-hover:bg-night-700 dark:group-hover:bg-cream-50 group-hover:text-cream-50 dark:group-hover:text-night-950 group-hover:border-transparent group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </span>

                                {/* متن */}
                                <div className="flex flex-col text-right flex-1 min-w-0">
                                    <span
                                        className={`${almarai.className} text-sm font-bold text-night-950 dark:text-cream-50`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        dir="ltr"
                                        className={`${estedad.className} text-xs md:text-sm text-night-700/60 dark:text-cream-50/50 group-hover:text-night-700 dark:group-hover:text-cream-50 transition-colors duration-300 truncate text-left`}
                                    >
                                        {item.value}
                                    </span>
                                </div>

                                {/* فلش ظریف */}
                                <span className="text-night-700/30 dark:text-cream-50/30 group-hover:text-night-700 dark:group-hover:text-cream-50 group-hover:-translate-x-1 transition-all duration-300 text-sm">
                                    ←
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ContactModal;
