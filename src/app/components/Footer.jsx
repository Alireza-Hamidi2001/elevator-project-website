import Link from "next/link";
import { almarai, estedad } from "../layout";
import {
    FaTelegramPlane,
    FaEnvelope,
    FaPhoneAlt,
    FaInstagram,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

function Footer() {
    const currentYear = new Date().getFullYear();

    const contactLinks = [
        {
            id: 1,
            label: "تلگرام",
            href: "https://t.me/",
            icon: <FaTelegramPlane />,
        },
        {
            id: 2,
            label: "ایمیل",
            href: "mailto:info@example.com",
            icon: <FaEnvelope />,
        },
        { id: 3, label: "تلفن", href: "tel:09151234567", icon: <FaPhoneAlt /> },
        {
            id: 4,
            label: "اینستاگرام",
            href: "https://instagram.com/",
            icon: <FaInstagram />,
        },
    ];

    const usefulLinks = [
        { id: 1, label: "ارتباط با ما", href: "/contact" },
        { id: 2, label: "درباره ما", href: "/about" },
        { id: 3, label: "خدمات", href: "/services" },
        { id: 4, label: "صفحه اصلی", href: "/" },
    ];

    const otherLinks = [
        { id: 1, label: "قوانین و مقررات", href: "/terms" },
        { id: 2, label: "حریم خصوصی", href: "/privacy" },
        { id: 3, label: "سوالات متداول", href: "/faq" },
        { id: 4, label: "فرصت‌های شغلی", href: "/careers" },
    ];

    return (
        <footer className="relative mt-16 md:mt-24 bg-cream-100 dark:bg-night-900 border-t border-amber-100 dark:border-cream-50/10 text-night-700 dark:text-cream-50">
            {/* خط تزئینی بالای فوتر */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-night-700/20 dark:via-cream-50/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 py-10 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                    {/* ===== ستون ۱: لوگو و توضیح ===== */}
                    <div className="xs:col-span-2 sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 group"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-night-700 dark:bg-cream-50 flex items-center justify-center text-cream-50 dark:text-night-950 font-bold text-base sm:text-lg transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                                E
                            </div>
                            <span
                                className={`${almarai.className} text-lg sm:text-xl font-bold`}
                            >
                                ELEVATOR
                            </span>
                        </Link>

                        <p className="mt-4 sm:mt-5 text-sm md:text-base leading-6 sm:leading-7 text-night-700/70 dark:text-cream-50/60 max-w-[45ch]">
                            ما با هدف ساده‌تر کردن انتخاب و خرید آسانسور،
                            پلتفرمی ساخته‌ایم که اطلاعات دقیق، مقایسه‌ی آسان و
                            پشتیبانی مطمئن را در اختیار شما می‌گذارد.
                        </p>

                        {/* آیکون‌های شبکه‌های اجتماعی */}
                        <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4 flex-wrap">
                            {contactLinks.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    className="text-night-700 dark:text-cream-50 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:-translate-y-0.5"
                                >
                                    <span className="text-xl sm:text-2xl">
                                        {item.icon}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ===== ستون ۲: راه‌های ارتباطی ===== */}
                    <div>
                        <h3
                            className={`${almarai.className} text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 relative inline-block`}
                        >
                            راه‌های ارتباطی
                            <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-night-700 dark:bg-cream-50 rounded-full" />
                        </h3>

                        <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                            {contactLinks.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${estedad.className} group flex items-center gap-2.5 sm:gap-3 text-sm md:text-base text-night-700/70 dark:text-cream-50/60 hover:text-night-700 dark:hover:text-cream-50 transition-colors duration-300`}
                                    >
                                        <span className="text-night-700/50 dark:text-cream-50/40 group-hover:text-night-700 dark:group-hover:text-cream-50 group-hover:scale-110 transition-all duration-300 shrink-0">
                                            {item.icon}
                                        </span>
                                        <span className="relative">
                                            {item.label}
                                            <span className="absolute -bottom-0.5 right-0 w-0 h-px bg-night-700 dark:bg-cream-50 transition-all duration-300 group-hover:w-full" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ===== ستون ۳: لینک‌های مفید ===== */}
                    <div>
                        <h3
                            className={`${almarai.className} text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 relative inline-block`}
                        >
                            لینک‌های مفید
                            <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-night-700 dark:bg-cream-50 rounded-full" />
                        </h3>

                        <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                            {usefulLinks.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className={`${estedad.className} group flex items-center gap-2 text-sm md:text-base text-night-700/70 dark:text-cream-50/60 hover:text-night-700 dark:hover:text-cream-50 transition-colors duration-300`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-night-700/30 dark:bg-cream-50/30 group-hover:bg-night-700 dark:group-hover:bg-cream-50 group-hover:scale-150 transition-all duration-300 shrink-0" />
                                        <span className="relative">
                                            {item.label}
                                            <span className="absolute -bottom-0.5 right-0 w-0 h-px bg-night-700 dark:bg-cream-50 transition-all duration-300 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ===== ستون ۴: لینک‌های دیگر ===== */}
                    <div>
                        <h3
                            className={`${almarai.className} text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 relative inline-block`}
                        >
                            لینک‌های دیگر
                            <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-night-700 dark:bg-cream-50 rounded-full" />
                        </h3>

                        <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                            {otherLinks.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className={`${estedad.className} group flex items-center gap-2 text-sm md:text-base text-night-700/70 dark:text-cream-50/60 hover:text-night-700 dark:hover:text-cream-50 transition-colors duration-300`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-night-700/30 dark:bg-cream-50/30 group-hover:bg-night-700 dark:group-hover:bg-cream-50 group-hover:scale-150 transition-all duration-300 shrink-0" />
                                        <span className="relative">
                                            {item.label}
                                            <span className="absolute -bottom-0.5 right-0 w-0 h-px bg-night-700 dark:bg-cream-50 transition-all duration-300 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ===== آدرس و کپی‌رایت ===== */}
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-amber-100 dark:border-cream-50/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                        <FaMapMarkerAlt className="w-4 h-4 text-night-700/50 dark:text-cream-50/40 mt-1 shrink-0" />
                        <p className="text-xs sm:text-sm md:text-base text-night-700/70 dark:text-cream-50/60">
                            مشهد، میدان صاحب‌الزمان، دفتر مرکزی
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-night-700/50 dark:text-cream-50/40">
                        © {currentYear} تمام حقوق محفوظ است.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
