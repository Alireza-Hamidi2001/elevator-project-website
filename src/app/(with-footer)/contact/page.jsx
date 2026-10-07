import building from "@/app/public/building.png";
import support_team from "@/app/public/support-team.png";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { almarai, parastoo, estedad } from "../../_fonts/fonts";
import { contactInfo } from "@/app/_data/ContactVariables";

export const metadata = {
    title: "ارتباط با ما",
};

/* همان سیستم کارت صفحه‌ی «درباره ما» تا کل سایت یکدست باشد */
const CARD =
    "rounded-2xl border border-night-700/10 dark:border-cream-50/10 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50";
const ICON_BOX = "flex text-xl w-fit mx-auto";
const MUTED = "text-night-700/70 dark:text-cream-50/60";
const SECTION = "mt-14 sm:mt-20 md:mt-28";

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

/* کارت تصویر + متن: دو باکس تصویری دقیقاً یک شکل هستند */
function MediaCard({ image, alt, title, text, children }) {
    return (
        <article
            className={`${CARD} flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group overflow-hidden flex flex-col`}
        >
            <img
                src={image.src}
                alt={alt}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
            />
            <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
                <h3
                    className={`${almarai.className} text-xl sm:text-2xl font-bold`}
                >
                    {title}
                </h3>
                <p
                    className={`mt-3 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 ${MUTED}`}
                >
                    {text}
                </p>
                <div className="mt-5 sm:mt-6">{children}</div>
            </div>
        </article>
    );
}

function ContactSection() {
    return (
        <main
            id="contact"
            dir="rtl"
            className="w-full mx-auto max-w-7xl px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 text-night-700 dark:text-cream-50"
        >
            {/* ===== Hero ===== */}
            <section className="max-w-4xl">
                <h1
                    className={`${parastoo.className} text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.3]`}
                >
                    با ما در تماس باشید
                </h1>
                <p
                    className={`mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-8 sm:leading-9 ${MUTED}`}
                >
                    تیم پشتیبانی ما آماده است تا در انتخاب، خرید و پشتیبانی
                    آسانسور در کنار شما باشد. از هر راهی که راحت‌ترید با ما در
                    ارتباط باشید.
                </p>
            </section>

            {/* ===== راه‌های ارتباطی ===== */}
            <section className="mt-10 sm:mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {contactInfo.map((item) => {
                        const external = item.id === "telegram";
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                target={external ? "_blank" : undefined}
                                rel={
                                    external ? "noopener noreferrer" : undefined
                                }
                                className={`${CARD} flex flex-col relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-5 sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500`}
                            >
                                <span
                                    className={`${ICON_BOX} transition-colors duration-300 p-2 rounded-sm  group-hover:text-white`}
                                >
                                    {item.icon}
                                </span>
                                <h3
                                    className={`${almarai.className} mt-4 text-base sm:text-lg font-bold`}
                                >
                                    {item.title}
                                </h3>
                                <div className="mt-2 space-y-1">
                                    {item.values.map((value) => (
                                        <p
                                            key={value}
                                            dir="ltr"
                                            className={`text-sm sm:text-base text-right break-all ${MUTED}`}
                                        >
                                            {value}
                                        </p>
                                    ))}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* ===== پشتیبانی و ارتباط حضوری ===== */}
            <section className={SECTION}>
                <SectionHeader
                    title="با پشتیبانی موثر در کنارتان هستیم."
                    subtitle="مشاوره تلفنی و مراجعه حضوری."
                />
                <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <MediaCard
                        image={support_team}
                        alt="تیم پشتیبانی"
                        title="همیشه در دسترس، همیشه پاسخگو"
                        text="چه برای مشاوره‌ی خرید، چه برای پیگیری سفارش و چه برای پشتیبانی فنی، کارشناسان ما در سریع‌ترین زمان ممکن پاسخ شما را می‌دهند."
                    >
                        <ul className="space-y-3">
                            {[
                                "پاسخگویی در کمتر از ۲ ساعت کاری",
                                "مشاوره‌ی تخصصی و رایگان",
                                "پشتیبانی پس از فروش",
                            ].map((t) => (
                                <li
                                    key={t}
                                    className="flex items-center gap-3 text-sm sm:text-base md:text-lg"
                                >
                                    <FaCheckCircle
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400"
                                    />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </MediaCard>

                    <MediaCard
                        image={building}
                        alt="ساختمان مرکزی"
                        title="ارتباط حضوری"
                        text="اگر ترجیح می‌دهید حضوری مشاوره بگیرید و از نزدیک با محصولات ما آشنا شوید، به دفتر مرکزی ما در مشهد مراجعه کنید. کارشناسان ما در فضایی صمیمی پاسخ سوالات شما را می‌دهند."
                    >
                        <div className="flex items-start gap-3 rounded-xl bg-red-500/5 border border-red-500/15 p-4">
                            <FaMapMarkerAlt
                                aria-hidden="true"
                                className="mt-1 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
                            />
                            <div>
                                <p
                                    className={`${almarai.className} font-semibold`}
                                >
                                    دفتر مرکزی
                                </p>
                                <p
                                    className={`mt-1 text-sm sm:text-base md:text-lg ${MUTED}`}
                                >
                                    مشهد، میدان صاحب‌الزمان، دفتر مرکزی
                                </p>
                            </div>
                        </div>
                    </MediaCard>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className={SECTION}>
                <div
                    className={`${CARD} relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6`}
                >
                    <div>
                        <h2
                            className={`${almarai.className} text-xl sm:text-2xl md:text-3xl font-bold`}
                        >
                            سوالی دارید؟ همین حالا بپرسید
                        </h2>
                        <p
                            className={`mt-2 text-base sm:text-lg leading-8 ${MUTED}`}
                        >
                            کارشناسان ما آماده‌ی پاسخگویی به شما هستند.
                        </p>
                    </div>
                    <a
                        href="tel:09151234567"
                        className={`${estedad.className} w-full md:w-auto md:shrink-0 rounded-xl bg-red-600 dark:bg-red-400 px-6 py-3 text-center text-sm sm:text-base text-cream-50 transition-colors duration-300 hover:bg-red-700 dark:hover:bg-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500`}
                    >
                        تماس فوری
                    </a>
                </div>
            </section>
        </main>
    );
}

export default ContactSection;
