import Link from "next/link";
import { features_about } from "../../components/Variables";
import GalleryServer from "../../components/gallery/GalleryServer";
import PeopleServer from "../../components/gallery/PeopleServer";
import { almarai, display, estedad } from "../../layout";

import {
    processSteps,
    stats,
    testimonials,
    features,
    faqs,
} from "@/app/_data/AboutVariables";

export const metadata = {
    title: "درباره ما",
};

/* ------------------------------------------------------------------ */
/*  یک استایل واحد برای همه‌ی باکس‌ها                                    */
/*  هر جا کارت لازم شد، فقط از همین استفاده می‌شود.                      */
/* ------------------------------------------------------------------ */
const CARD =
    "rounded-2xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50";

const ICON_BOX =
    "flex text-xl w-fit mx-auto text-center";

const MUTED = "text-night-700/70 dark:text-cream-50/60";

const SECTION = "px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 mt-14 sm:mt-20 md:mt-28";

function Card({ as: Tag = "div", className = "", children, ...rest }) {
    return (
        <Tag className={`${CARD} ${className}`} {...rest}>
            {children}
        </Tag>
    );
}

function SectionHeader({ title, subtitle }) {
    return (
        <div className="max-w-2xl">
            <h2
                className={`${almarai.className} text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-2 sm:mt-3 text-sm sm:text-base md:text-lg leading-7 ${MUTED}`}
                >
                    {subtitle}
                </p>
            )}
            <div className="mt-4 h-1 w-14 rounded-full bg-red-600 dark:bg-red-400" />
        </div>
    );
}

function AboutSection() {
    return (
        <main
            id="about"
            dir="rtl"
            className="w-full mx-auto max-w-7xl pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 text-night-700 dark:text-cream-50"
        >
            {/* ===== Hero ===== */}
            <section className="px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 max-w-4xl">
                <h1
                    className={`${display.className} text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.3]`}
                >
                    درباره درخشان آبادیس آسانبر
                </h1>
                <p
                    className={`mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-8 sm:leading-9 ${MUTED}`}
                >
                    ما تیمی هستیم که با هدف ساده‌تر کردن انتخاب و خرید آسانسور
                    دور هم جمع شده‌ایم. اینجا می‌توانید با داستان ما، اهدافمان و
                    افرادی که این مسیر را همراهی می‌کنند آشنا شوید.
                </p>
            </section>

            {/* ===== گالری ===== */}
            <section className="px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 mt-10 sm:mt-14">
                <GalleryServer />
            </section>

            {/* ===== آمار ===== */}
            <section className={SECTION}>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {stats.map((item) => (
                        <Card
                            key={item.label}
                            className="flex items-center gap-4"
                        >
                            <span className={ICON_BOX}>{item.icon}</span>
                            <div className="min-w-0">
                                <div
                                    className={`${almarai.className} text-2xl sm:text-3xl font-bold leading-tight`}
                                >
                                    {item.value}
                                </div>
                                <p
                                    className={`mt-0.5 text-sm sm:text-base ${MUTED}`}
                                >
                                    {item.label}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ===== تیم ===== */}
            <section className="px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 mt-14 sm:mt-20 md:mt-28">
                <PeopleServer />
            </section>

            {/* ===== تاریخچه و اهداف ===== */}
            <section
                className={`${SECTION} grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 sm:gap-8 items-start`}
            >
                <Card className="p-6 sm:p-8">
                    <SectionHeader
                        title="تاریخچه"
                        subtitle="مسیری که از یک کارگاه کوچک تا امروز طی کردیم."
                    />
                    <div
                        className={`mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 ${MUTED}`}
                    >
                        <p>
                            شرکت آسانسور{" "}
                            <span className="font-semibold text-night-700 dark:text-cream-50">
                                درخشان آبادیس آسانبر
                            </span>{" "}
                            فعالیت خود را در سال ۱۳۸۸ با یک کارگاه کوچک در
                            حاشیه‌ی شهر آغاز کرد. در آن سال‌ها، هدف ساده بود:
                            ارائه‌ی آسانسورهایی که هم ایمن باشند و هم برای
                            ساختمان‌های ایرانی مقرون‌به‌صرفه.
                        </p>
                        <p>
                            در سال ۱۳۹۲ نخستین خط تولید اختصاصی این شرکت
                            راه‌اندازی شد و با دریافت گواهینامه‌های استاندارد
                            ملی، فعالیت خود را به‌صورت رسمی در سراسر کشور گسترش
                            داد. تنها سه سال بعد، تیم خدمات پس از فروش تشکیل شد
                            تا هیچ مشتری‌ای پس از خرید، تنها نماند.
                        </p>
                        <p>
                            امروز، پس از بیش از یک دهه فعالیت، با افتخار اعلام
                            می‌کنیم که بیش از{" "}
                            <span className="font-semibold text-night-700 dark:text-cream-50">
                                ۲٬۵۰۰ پروژه
                            </span>{" "}
                            در شهرهای مختلف کشور به دست تیم ما نصب و راه‌اندازی
                            شده است.
                        </p>
                    </div>
                </Card>

                <Card className="p-6 sm:p-8">
                    <SectionHeader
                        title="اهداف"
                        subtitle="آنچه ما را به جلو می‌راند."
                    />
                    <ul className="mt-6 sm:mt-8 space-y-5">
                        {features.map((item) => (
                            <li
                                key={item.title}
                                className="flex items-start gap-3"
                            >
                                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-red-600 dark:bg-red-400" />
                                <div>
                                    <h3
                                        className={`${almarai.className} text-base sm:text-lg font-bold`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={`mt-1 text-sm sm:text-base leading-6 sm:leading-7 ${MUTED}`}
                                    >
                                        {item.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>

            {/* ===== فرآیند همکاری (ترتیب واقعی دارد، پس شماره‌گذاری) ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="فرآیند همکاری"
                    subtitle="از اولین تماس تا تحویل کلید، همراه شما هستیم."
                />

                <ol className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {processSteps.map((item, index) => {
                        const isLast = index === processSteps.length - 1;
                        return (
                            <li
                                key={item.step}
                                className="relative flex gap-4 sm:gap-6 pb-6 sm:pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
                            >
                                {/* مسیر: دایره‌ی شماره + خط اتصال به گام بعد */}
                                <div className="flex flex-col items-center lg:flex-row lg:items-center">
                                    <span
                                        className={`${almarai.className} relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-base sm:text-lg font-bold text-white shadow-lg shadow-red-600/30 ring-4 ring-red-500/15`}
                                    >
                                        {item.step}
                                    </span>

                                    {!isLast && (
                                        <span
                                            aria-hidden="true"
                                            className="my-2 w-0.5 flex-1 rounded-full bg-gradient-to-b from-red-600 to-red-500/20 lg:my-0 lg:mx-2 lg:h-0.5 lg:w-auto lg:bg-gradient-to-l"
                                        />
                                    )}
                                </div>

                                {/* محتوای گام */}
                                <div className="min-w-0 flex-1 lg:mt-5 lg:pe-5 lg:last:pe-0">
                                    <Card className="h-full">
                                        <span className={ICON_BOX}>
                                            {item.icon}
                                        </span>
                                        <h3
                                            className={`${almarai.className} mt-4 text-base sm:text-lg font-bold`}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className={`mt-2 text-sm sm:text-base leading-6 sm:leading-7 ${MUTED}`}
                                        >
                                            {item.text}
                                        </p>
                                    </Card>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </section>

            {/* ===== ویژگی‌ها ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="چرا درخشان آبادیس؟"
                    subtitle="چیزهایی که ما را از بقیه متمایز می‌کند."
                />
                <ul className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {features_about.map((item) => (
                        <Card
                            as="li"
                            key={item.title}
                        >
                            <span className={ICON_BOX}>{item.icon}</span>
                            <h3
                                className={`${almarai.className} mt-4 text-base sm:text-lg font-bold`}
                            >
                                {item.title}
                            </h3>
                            <p
                                className={`mt-2 text-sm sm:text-base leading-6 sm:leading-7 ${MUTED}`}
                            >
                                {item.text}
                            </p>
                        </Card>
                    ))}
                </ul>
            </section>

            {/* ===== نظرات مشتریان ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="مشتریان ما چه می‌گویند"
                    subtitle="اعتماد شما، بزرگ‌ترین سرمایه ماست."
                />
                <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                    {testimonials.map((item) => (
                        <Card
                            key={item.name}
                            className="flex flex-col"
                        >
                            <span
                                aria-hidden="true"
                                className="h-8 text-5xl leading-none text-red-600/40 dark:text-red-400/40 select-none"
                            >
                                ”
                            </span>
                            <p
                                className={`mt-2 flex-1 text-sm sm:text-base leading-7 text-night-700/80 dark:text-cream-50/70`}
                            >
                                {item.text}
                            </p>
                            <div className="mt-5 pt-4 border-t border-night-700/10 dark:border-cream-50/10">
                                <h3
                                    className={`${almarai.className} text-sm sm:text-base font-bold`}
                                >
                                    {item.name}
                                </h3>
                                <p
                                    className={`mt-1 text-xs sm:text-sm ${MUTED}`}
                                >
                                    {item.role}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ===== سوالات متداول ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="سوالات متداول"
                    subtitle="پاسخ سوالاتی که بیشتر از ما پرسیده می‌شود."
                />
                <div className="mt-8 sm:mt-10 max-w-3xl space-y-3 sm:space-y-4">
                    {faqs.map((item, index) => (
                        <details
                            key={index}
                            className={`group ${CARD} !p-0 open:border-red-500/40`}
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded-2xl [&::-webkit-details-marker]:hidden">
                                <h3
                                    className={`${almarai.className} text-sm sm:text-base md:text-lg font-bold`}
                                >
                                    {item.q}
                                </h3>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xl text-red-600 dark:text-red-400 transition-transform duration-300 group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <div
                                className={`px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base leading-7 ${MUTED}`}
                            >
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* ===== CTA نهایی ===== */}
            <section className={SECTION}>
                <Card className="p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h2
                            className={`${estedad.className} text-xl sm:text-2xl md:text-3xl font-semibold`}
                        >
                            آماده‌اید انتخاب را شروع کنید؟
                        </h2>
                        <p
                            className={`mt-2 text-base sm:text-lg leading-8 ${MUTED}`}
                        >
                            ابتدا وارد حساب کاربری خود شوید و مدل‌های مورد
                            علاقه‌تان را ذخیره کنید.
                        </p>
                        <div
                            className={`mt-4 flex flex-col xs:flex-row xs:flex-wrap gap-2 xs:gap-6 text-sm ${MUTED}`}
                        >
                            <span className="flex items-center gap-2">
                                <span aria-hidden="true">📞</span>
                                <bdi>۰۲۱-۱۲۳۴۵۶۷۸</bdi>
                            </span>
                            <span className="flex items-center gap-2 break-all">
                                <span aria-hidden="true">✉️</span>
                                <bdi>info@derakhshan-abadis.ir</bdi>
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/login"
                        className={`${estedad.className} w-full md:w-auto md:shrink-0 rounded-xl bg-red-600 dark:bg-red-400 px-6 py-3 text-center text-sm sm:text-base text-cream-50 transition-colors duration-300 hover:bg-red-700 dark:hover:bg-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500`}
                    >
                        ورود به حساب کاربری
                    </Link>
                </Card>
            </section>
        </main>
    );
}

export default AboutSection;
