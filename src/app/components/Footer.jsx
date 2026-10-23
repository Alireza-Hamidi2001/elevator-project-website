// components/Footer.jsx
import Image from "next/image";
import {
    FaTelegramPlane,
    FaPhoneAlt,
    FaEnvelope,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";
import { almarai, estedad } from "@/app/_fonts/fonts";
import Logo from "./Logo";

export default function Footer() {
    const socials = [
        { id: "telegram", icon: FaTelegramPlane, href: "#", label: "تلگرام" },
        { id: "instagram", icon: FaInstagram, href: "#", label: "اینستاگرام" },
        { id: "whatsapp", icon: FaWhatsapp, href: "#", label: "واتس‌اپ" },
        {
            id: "phone",
            icon: FaPhoneAlt,
            href: "tel:09151234567",
            label: "تماس تلفنی",
        },
        {
            id: "email",
            icon: FaEnvelope,
            href: "mailto:info@abadis.com",
            label: "ایمیل",
        },
    ];

    return (
        <footer className="mt-16 mx-2 rounded-2xl overflow-hidden">
            <div className="relative bg-cream-100 dark:bg-night-900 border border-night-700/10 dark:border-cream-50/10">
                {/* الگوی تزئینی */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)`,
                        backgroundSize: "40px 40px, 40px 40px",
                    }}
                />

                <div className="relative max-w-8xl mx-auto px-6 sm:px-8 md:px-12 py-10 sm:py-14">
                    {/* بخش بالا: لوگو + اسم + توضیح */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 h-24 rounded-full bg-night-900/5 dark:bg-cream-50/5 border border-night-900/10 dark:border-cream-50/10 flex items-center justify-center p-3 backdrop-blur-sm">
                            <Logo />
                        </div>

                        <h2
                            className={`${almarai.className} text-xl sm:text-2xl md:text-3xl font-bold text-center text-night-900 dark:text-cream-50`}
                        >
                            درخشان آبادیس آسانبر
                        </h2>

                        <p
                            className={`${estedad.className} text-sm sm:text-base text-night-700/70 dark:text-cream-50/60 text-center max-w-md leading-7`}
                        >
                            همراه شما در مسیری مطمئن به سمت بالا
                        </p>
                    </div>

                    {/* خط جداکننده */}
                    <div className="mt-8 mb-8 h-px w-full bg-gradient-to-l from-transparent via-night-900/20 dark:via-cream-50/20 to-transparent" />

                    {/* بخش پایین: شبکه‌های اجتماعی */}
                    <div className="flex flex-col items-center gap-4">
                        <p
                            className={`${estedad.className} text-xs sm:text-sm text-night-700/60 dark:text-cream-50/50`}
                        >
                            ما را در شبکه‌های اجتماعی دنبال کنید
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                            {socials.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={s.id}
                                        href={s.href}
                                        aria-label={s.label}
                                        target={
                                            s.href.startsWith("http")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            s.href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="w-11 h-11 rounded-full flex items-center justify-center bg-night-900/5 dark:bg-cream-50/5 border border-night-900/10 dark:border-cream-50/10 text-night-700 dark:text-cream-50/70 hover:bg-red-500 hover:text-cream-50 hover:border-red-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* خط جداکننده */}
                    <div className="mt-8 mb-6 h-px w-full bg-gradient-to-l from-transparent via-night-900/20 dark:via-cream-50/20 to-transparent" />

                    {/* کپی‌رایت */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
                        <p
                            className={`${estedad.className} text-xs sm:text-sm text-night-700/60 dark:text-cream-50/50`}
                        >
                            © {new Date().getFullYear()} تمامی حقوق برای{" "}
                            <span className="text-night-900 dark:text-cream-50/80 font-medium">
                                درخشان آبادیس آسانبر
                            </span>{" "}
                            محفوظ است.
                        </p>
                        <p
                            className={`${estedad.className} text-xs sm:text-sm text-night-700/50 dark:text-cream-50/40`}
                        >
                            طراحی و توسعه با ❤️
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
