// app/(with-footer)/about/page.jsx
import {
    faqs,
    features,
    processSteps,
    stats,
    testimonials,
} from "@/app/_data/AboutVariables";
import Image from "next/image";
import Link from "next/link";
import { RiTargetFill } from "react-icons/ri";
import { features_about } from "../../components/Variables";
import GalleryServer from "../../components/gallery/GalleryServer";
import PeopleServer from "../../components/gallery/PeopleServer";
import { almarai, parastoo, estedad } from "../../_fonts/fonts";
import image_1 from "./../../../app/public/image-1.png";
import BackgroundFX from "./BackgroundFX";
import Testimonials from "../../components/Testimonials";

export const metadata = {
    title: "درباره ما",
};

const CARD =
    "rounded-2xl border border-night-700/10 dark:border-cream-50/10 bg-white dark:bg-night-800 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg ";

const ICON_BOX = "flex text-xl w-fit mx-auto text-center";

const MUTED = "text-night-700/70 dark:text-cream-50/60";

const SECTION =
    "px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 mt-14 sm:mt-20 md:mt-28";

function Card({ as: Tag = "div", className = "", children, ...rest }) {
    return (
        <Tag
            className={`${CARD} ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}

function SectionHeader({ title, subtitle }) {
    return (
        <div className="max-w-2xl mt-12">
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
            className="relative w-full mx-auto max-w-8xl pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 text-night-700 dark:text-cream-50"
        >
            {/* ===== پس‌زمینه سراسری کل صفحه ===== */}

            {/* ===== Hero ===== */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12">
                <div>
                    <h1
                        className={`${parastoo.className} text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.3]`}
                    >
                        درباره درخشان آبادیس آسانبر
                    </h1>
                    <p
                        className={`mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-8 sm:leading-7 ${MUTED}`}
                    >
                        ما تیمی هستیم که با هدف ساده‌تر کردن انتخاب و خرید
                        آسانسور دور هم جمع شده‌ایم. اینجا می‌توانید با داستان
                        ما، اهدافمان و افرادی که این مسیر را همراهی می‌کنند آشنا
                        شوید.
                    </p>
                </div>
                <div className="relative rounded-2xl w-full h-[20rem] border border-gray-400 dark:border-night-700">
                    <Image
                        src={image_1}
                        fill
                        alt=""
                        className="object-cover rounded-2xl hover:scale-105 transition-all duration-300 -translate-x-3 -translate-y-5"
                    />
                </div>
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
                            className="relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group flex flex-col items-center gap-4"
                        >
                            <span className={ICON_BOX}>{item.icon}</span>
                            <div className="min-w-0">
                                <div
                                    className={`${almarai.className} text-center text-2xl sm:text-3xl font-bold leading-tight`}
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
                <Card className="p-6 sm:p-8 flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group">
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

                <Card className="p-6 sm:p-8 flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group">
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
                                <div>
                                    <div className="flex items-center gap-2">
                                        <RiTargetFill className="w-6 h-6" />
                                        <h3
                                            className={`${almarai.className} text-base sm:text-lg font-bold`}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
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

            {/* ===== فرآیند همکاری ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="فرآیند همکاری"
                    subtitle="از اولین تماس تا تحویل همراه شما هستیم."
                />

                <ol className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {processSteps.map((item, index) => {
                        const isLast = index === processSteps.length - 1;
                        return (
                            <li
                                key={item.step}
                                className="relative flex gap-4 sm:gap-6 pb-6 sm:pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
                            >
                                <div className="flex flex-col items-center lg:flex-row lg:items-center">
                                    <span
                                        className={`${almarai.className} relative z-10 flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-red-600 text-base sm:text-2xl font-bold text-white shadow-lg ring-4 ring-red-500/15`}
                                    >
                                        {item.step}
                                    </span>

                                    {!isLast && (
                                        <span
                                            aria-hidden="true"
                                            className="my-2 w-0.5 flex-1 rounded-full bg-linear-to-b from-red-500 to-red-500/20 lg:my-0 lg:mx-2 lg:h-0.5 lg:w-auto lg:bg-linear-to-l"
                                        />
                                    )}
                                </div>

                                <div className="group *:min-w-0 flex-1 lg:mt-5 lg:pe-5 lg:last:pe-0">
                                    <Card className="h-full flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group">
                                        <span
                                            className={`${ICON_BOX} group-hover:-rotate-30 transition-all duration-300`}
                                        >
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
                            className="relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group"
                        >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                            <span className={`${ICON_BOX} relative z-10`}>
                                {item.icon}
                            </span>
                            <h3
                                className={`${almarai.className} relative z-10 w-fit mx-auto mt-4 text-base sm:text-lg font-bold`}
                            >
                                {item.title}
                            </h3>
                            <p
                                className={`relative z-10 w-fit mx-auto mt-2 text-sm sm:text-base leading-6 sm:leading-7 ${MUTED}`}
                            >
                                {item.text}
                            </p>
                        </Card>
                    ))}
                </ul>

                <SectionHeader
                    title="مشتریان ما چه می‌گویند"
                    subtitle="اعتماد شما، بزرگ‌ترین سرمایه ماست."
                />
                <Testimonials testimonials={testimonials} />

                {/* ===== سوالات متداول ===== */}
                <SectionHeader
                    title="سوالات متداول"
                    subtitle="پاسخ سوالاتی که بیشتر از ما پرسیده می‌شود."
                />
                <div className="mt-8 sm:mt-10 max-w-3xl space-y-3 sm:space-y-4">
                    {faqs.map((item, index) => (
                        <details
                            key={index}
                            className={`group ${CARD} relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 !p-0 open:border-red-500/60`}
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded-2xl [&::-webkit-details-marker]:hidden">
                                <h3
                                    className={`${almarai.className} text-sm sm:text-base md:text-lg font-bold`}
                                >
                                    {item.q}
                                </h3>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-3xl text-red-500 dark:text-red-400 transition-transform duration-300 group-open:rotate-45">
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
                <Card className="flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
