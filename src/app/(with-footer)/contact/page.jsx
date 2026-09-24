import {
    FaPhoneAlt,
    FaTelegramPlane,
    FaEnvelope,
    FaMapMarkerAlt,
    FaMobileAlt,
} from "react-icons/fa";
import { almarai, estedad } from "../../layout";
import support_team from "@/app/public/support-team.png";
import building from "@/app/public/building.png";

function ContactPage() {
    const contactInfo = [
        {
            id: "phone",
            icon: <FaPhoneAlt className="w-10 h-10" />,
            title: "تلفن ثابت",
            values: ["051-3847-2210", "051-3847-2211"],
            href: "tel:05138472210",
        },
        {
            id: "mobile",
            icon: <FaMobileAlt className="w-10 h-10" />,
            title: "تلفن همراه",
            values: ["0915-123-4567", "0915-765-4321"],
            href: "tel:09151234567",
        },
        {
            id: "telegram",
            icon: <FaTelegramPlane className="w-10 h-10" />,
            title: "تلگرام",
            values: ["@elevator_support"],
            href: "https://t.me/elevator_support",
        },
        {
            id: "email",
            icon: <FaEnvelope className="w-10 h-10" />,
            title: "ایمیل",
            values: ["info@elevator-platform.ir"],
            href: "mailto:info@elevator-platform.ir",
        },
    ];

    return (
        <main
            dir="rtl"
            className="w-full my-[4rem] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 max-w-7xl py-10 md:py-16 lg:py-20 text-night-700 dark:text-cream-50"
        >
            {/* ===== Hero ===== */}
            <section className="text-center max-w-3xl mx-auto">
                <h1
                    className={`${almarai.className} text-3xl md:text-4xl lg:text-5xl font-bold`}
                >
                    با ما در تماس باشید
                </h1>
                <p className="mt-4 text-lg md:text-xl text-night-700/70 dark:text-cream-50/60 leading-8">
                    تیم پشتیبانی ما آماده است تا در انتخاب، خرید و پشتیبانی
                    آسانسور در کنار شما باشد. از هر راهی که راحت‌ترید با ما در
                    ارتباط باشید.
                </p>
                <div className="mt-6 h-1 w-20 bg-night-700 dark:bg-cream-50 mx-auto rounded-full" />
            </section>

            {/* ===== Z-Pattern Section ===== */}
            <section className="mt-16 md:mt-24 space-y-16 md:space-y-24">
                {/* --- Row 1: Text Right, Image Left (Z pattern) --- */}
                {/* --- Row 1: Text Right, Image Left (Z pattern) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* متن کناری - همیشه هست */}
                    <div className="order-2 md:order-1">
                        <h2
                            className={`${almarai.className} text-2xl md:text-3xl font-bold`}
                        >
                            همیشه در دسترس، همیشه پاسخگو
                        </h2>
                        <p className="mt-4 text-base md:text-lg leading-8 text-night-700/70 dark:text-cream-50/60">
                            چه برای مشاوره‌ی خرید، چه برای پیگیری سفارش و چه
                            برای پشتیبانی فنی، کارشناسان ما در سریع‌ترین زمان
                            ممکن پاسخ شما را می‌دهند. هدف ما این است که تجربه‌ی
                            خرید آسانسور برای شما ساده و بی‌دغدغه باشد.
                        </p>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                <span className="text-base md:text-lg">
                                    پاسخگویی در کمتر از ۲ ساعت کاری
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                <span className="text-base md:text-lg">
                                    مشاوره‌ی تخصصی و رایگان
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                <span className="text-base md:text-lg">
                                    پشتیبانی پس از فروش
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* کانتینر تصویر با گروه هاور */}
                    <div className="relative order-1 md:order-2 group overflow-hidden rounded-2xl">
                        <img
                            src={support_team.src}
                            alt="تیم پشتیبانی"
                            className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Overlay گرادیان مشکی از پایین به بالا */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                        {/* متن روی تصویر - پایین سمت راست */}
                        <div className="absolute bottom-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                            <h3
                                className={`${almarai.className} text-cream-50 text-xl md:text-2xl font-bold`}
                            >
                                تیم پشتیبانی ما
                            </h3>
                            <p className="mt-2 text-cream-50/80 text-sm md:text-base leading-7 max-w-[40ch]">
                                همیشه آماده‌ی پاسخگویی به سوالات شما هستیم
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Row 2: Image Right, Text Left --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image placeholder */}
                    <div>
                        <div className="relative order-1 md:order-2 group overflow-hidden rounded-2xl">
                            <img
                                src={building.src}
                                alt="تیم پشتیبانی"
                                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Overlay گرادیان مشکی از پایین به بالا */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                            {/* متن روی تصویر - پایین سمت راست */}
                            <div className="absolute bottom-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                                <h3
                                    className={`${almarai.className} text-cream-50 text-xl md:text-2xl font-bold`}
                                >
                                    ساختمان مرکزی
                                </h3>
                                <p className="mt-2 text-cream-50/80 text-sm md:text-base leading-7 max-w-[40ch]">
                                    پذیرای شما هستیم
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2
                            className={`${almarai.className} text-2xl md:text-3xl font-bold`}
                        >
                            ارتباط حضوری
                        </h2>
                        <p className="mt-4 text-base md:text-lg leading-8 text-night-700/70 dark:text-cream-50/60">
                            اگر ترجیح می‌دهید حضوری مشاوره بگیرید و از نزدیک با
                            محصولات ما آشنا شوید، به دفتر مرکزی ما در مشهد
                            مراجعه کنید. کارشناسان ما در فضایی صمیمی پاسخ سوالات
                            شما را می‌دهند.
                        </p>
                        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-amber-100 dark:border-cream-50/10 bg-cream-50/50 dark:bg-night-900/40">
                            <FaMapMarkerAlt className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                            <div>
                                <p
                                    className={`${almarai.className} font-semibold`}
                                >
                                    دفتر مرکزی
                                </p>
                                <p className="mt-1 text-base md:text-lg text-night-700/70 dark:text-cream-50/60">
                                    مشهد، میدان صاحب‌الزمان، دفتر مرکزی
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Contact Cards ===== */}
            <section className="mt-16 md:mt-24">
                <h2
                    className={`${almarai.className} text-2xl md:text-3xl font-bold text-center`}
                >
                    راه‌های ارتباطی
                </h2>
                <p className="mt-3 text-base md:text-lg text-center text-night-700/70 dark:text-cream-50/60">
                    از هر کدام از راه‌های زیر می‌توانید با ما در تماس باشید
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            target={
                                item.id === "telegram" ? "_blank" : undefined
                            }
                            rel={
                                item.id === "telegram"
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="group relative overflow-hidden rounded-2xl border border-amber-100 dark:border-cream-50/10 bg-cream-50/40 dark:bg-night-900/40 p-6 flex flex-col items-center text-center transition-all duration-500 ease-out hover:-translate-y-2 hover:border-night-700/20 dark:hover:border-cream-50/30 hover:shadow-xl hover:shadow-night-950/5 dark:hover:shadow-black/30"
                        >
                            {/* گرادیان ملایم پس‌زمینه موقع هاور */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 via-amber-100/0 to-amber-100/60 dark:from-night-800/0 dark:via-night-800/0 dark:to-night-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* محتوای کارت */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-cream-50 dark:bg-night-950   text-night-700 dark:text-cream-50 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-[12deg] group-hover:border-night-700/20 dark:group-hover:border-cream-50/30">
                                    <span className="text-5xl">
                                        {item.icon}
                                    </span>
                                </div>

                                <h3
                                    className={`${almarai.className} mt-5 text-2xl font-semibold`}
                                >
                                    {item.title}
                                </h3>

                                <div className="mt-3 space-y-1.5">
                                    {item.values.map((value) => (
                                        <p
                                            key={value}
                                            className="text-lg text-night-700/70 dark:text-cream-50/60 group-hover:text-night-700 dark:group-hover:text-cream-50 transition-colors duration-300"
                                            dir="ltr"
                                        >
                                            {value}
                                        </p>
                                    ))}
                                </div>

                                {/* خط زیر متن که موقع هاور کشیده میشه */}
                                <span className="mt-4 block h-px w-8 bg-night-700/30 dark:bg-cream-50/30 transition-all duration-500 group-hover:w-16 group-hover:bg-night-700 dark:group-hover:bg-cream-50" />
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="mt-16 md:mt-24 rounded-lg border border-amber-100 dark:border-cream-50/10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h2
                        className={`${almarai.className} text-2xl md:text-3xl font-bold`}
                    >
                        سوالی دارید؟ همین حالا بپرسید
                    </h2>
                    <p className="mt-2 text-lg md:text-xl text-night-700/70 dark:text-cream-50/60">
                        کارشناسان ما آماده‌ی پاسخگویی به شما هستند
                    </p>
                </div>
                <a
                    href="tel:09151234567"
                    className={`${estedad.className} bg-red-600 dark:bg-red-500 text-cream-50 px-6 py-3 rounded-sm text-center hover:-translate-y-0.5 transition-all duration-300 md:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500`}
                >
                    تماس فوری
                </a>
            </section>
        </main>
    );
}

export default ContactPage;
