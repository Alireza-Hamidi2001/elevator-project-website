import Link from "next/link";
import { features_about } from "../../components/Variables";
import GalleryServer from "../../components/gallery/GalleryServer";
import PeopleServer from "../../components/gallery/PeopleServer";
import { almarai, estedad } from "../../layout";
import Image from "next/image";
import features from "@/app/public/features.png";

function AboutPage() {
    return (
        <main
            dir="rtl"
            className="w-full my-[4rem] mx-auto  max-w-8xl py-10 md:py-16 lg:py-20 text-night-700 dark:text-cream-50"
        >
            <section className="px-5 sm:px-8 md:px-10 lg:px-12 text-center max-w-3xl mx-auto">
                <h1
                    className={`${almarai.className} text-3xl md:text-4xl lg:text-5xl font-bold`}
                >
                    درباره ما بیشتر بدانید
                </h1>
                <p className="mt-4 text-lg md:text-xl text-night-700/70 dark:text-cream-50/60 leading-8">
                    ما تیمی هستیم که با هدف ساده‌تر کردن انتخاب و خرید آسانسور
                    دور هم جمع شده‌ایم. اینجا می‌توانید با داستان ما، اهدافمان و
                    افرادی که این مسیر را همراهی می‌کنند آشنا شوید.
                </p>
                <div className="mt-6 h-1 w-20 bg-night-700 dark:bg-cream-50 mx-auto rounded-full" />
            </section>
            <section className="px-5 sm:px-8 md:px-10 lg:px-12 grid grid-cols-1 gap-8 items-center">
                <GalleryServer />
            </section>
            <section className="mt-16 md:mt-24 p-6">
                <PeopleServer />
            </section>
            <section className="px-5 sm:px-8 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 md:gap-20 w-full py-16 md:py-24 text-night-700 dark:text-cream-50">
                {/* ===== تاریخچه (ستون بزرگ‌تر) ===== */}
                <div className="group">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h2
                                className={`${almarai.className}  transition-all duration-300 text-2xl md:text-3xl lg:text-4xl font-bold`}
                            >
                                تاریخچه
                            </h2>
                            <p className="mt-3 text-base md:text-lg text-night-700/70 dark:text-cream-50/60">
                                مسیری که از یک کارگاه کوچک تا امروز طی کردیم.
                            </p>
                        </div>
                        <div className="h-1 w-20 group-hover:w-50 transition-all duration-300 bg-night-700 dark:bg-cream-50 rounded-full md:mb-3 shrink-0" />
                    </div>

                    <div className="mt-8 space-y-5 text-base md:text-lg leading-8 text-night-700/80 dark:text-cream-50/70">
                        <p>
                            شرکت آسانسور{" "}
                            <span className="font-semibold text-night-700 dark:text-cream-50">
                                پارسارین
                            </span>{" "}
                            فعالیت خود را در سال ۱۳۸۸ با یک کارگاه کوچک در
                            حاشیه‌ی شهر آغاز کرد. در آن سال‌ها، هدف ساده بود:
                            ارائه‌ی آسانسورهایی که هم ایمن باشند و هم برای
                            ساختمان‌های ایرانی مقرون‌به‌صرفه. اما خیلی زود مشخص
                            شد که بازار به چیزی فراتر از یک محصول نیاز دارد — به
                            اعتماد، به پشتیبانی، و به همراهی بلندمدت.
                        </p>
                        <p>
                            در سال ۱۳۹۲ نخستین خط تولید اختصاصی این شرکت
                            راه‌اندازی شد و با دریافت گواهینامه‌های استاندارد
                            ملی، فعالیت خود را به‌صورت رسمی در سراسر کشور گسترش
                            داد. تنها سه سال بعد، در سال ۱۳۹۵، تیم خدمات پس از
                            فروش پارسارین تشکیل شد تا هیچ مشتری‌ای پس از خرید،
                            تنها نماند.
                        </p>
                        <p>
                            امروز، پس از بیش از یک دهه فعالیت، با افتخار اعلام
                            می‌کنیم که بیش از{" "}
                            <span className="font-semibold text-night-700 dark:text-cream-50">
                                ۲٬۵۰۰ پروژه
                            </span>{" "}
                            در شهرهای مختلف کشور به دست تیم ما نصب و راه‌اندازی
                            شده است. اما آنچه بیش از آمار برایمان ارزشمند است،
                            اعتماد مشتریانی است که پس از سال‌ها، همچنان همراه ما
                            مانده‌اند.
                        </p>
                    </div>
                </div>

                {/* ===== اهداف (ستون کوچک‌تر) ===== */}
                <div className="group">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h2
                                className={`${almarai.className} text-2xl md:text-3xl lg:text-4xl font-bold`}
                            >
                                اهداف
                            </h2>
                            <p className="mt-3 text-base md:text-lg text-night-700/70 dark:text-cream-50/60">
                                آنچه ما را به جلو می‌راند.
                            </p>
                        </div>
                        <div className="h-1 w-20 group-hover:w-35 transition-all duration-300 bg-night-700 dark:bg-cream-50 rounded-full md:mb-3 shrink-0" />
                    </div>

                    <ul className="mt-8 space-y-5">
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full bg-night-700 dark:bg-cream-50 shrink-0" />
                            <div>
                                <h3
                                    className={`${almarai.className} text-lg font-bold`}
                                >
                                    ایمنی بدون مصالحه
                                </h3>
                                <p className="mt-1 text-base leading-7 text-night-700/70 dark:text-cream-50/60">
                                    هر آسانسوری که تحویل می‌دهیم، پیش از هر چیز
                                    باید استانداردهای ایمنی را کامل رعایت کند.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full bg-night-700 dark:bg-cream-50 shrink-0" />
                            <div>
                                <h3
                                    className={`${almarai.className} text-lg font-bold`}
                                >
                                    پشتیبانی مادام‌العمر
                                </h3>
                                <p className="mt-1 text-base leading-7 text-night-700/70 dark:text-cream-50/60">
                                    رابطه‌ی ما با مشتری پس از نصب تمام نمی‌شود؛
                                    تازه شروع می‌شود.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full bg-night-700 dark:bg-cream-50 shrink-0" />
                            <div>
                                <h3
                                    className={`${almarai.className} text-lg font-bold`}
                                >
                                    نوآوری مستمر
                                </h3>
                                <p className="mt-1 text-base leading-7 text-night-700/70 dark:text-cream-50/60">
                                    هر سال بخشی از درآمدمان را به تحقیق و توسعه
                                    اختصاص می‌دهیم تا محصولاتمان به‌روز بمانند.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full bg-night-700 dark:bg-cream-50 shrink-0" />
                            <div>
                                <h3
                                    className={`${almarai.className} text-lg font-bold`}
                                >
                                    دسترسی آسان
                                </h3>
                                <p className="mt-1 text-base leading-7 text-night-700/70 dark:text-cream-50/60">
                                    هدف ما این است که انتخاب و خرید آسانسور برای
                                    همه، ساده و شفاف باشد.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            {/* Features */}
            <section className="mt-16 md:mt-24 relative overflow-hidden">
                {/* ===== پس‌زمینه Parallax ===== */}
                <div className="absolute inset-0">
                    <Image
                        src={features}
                        alt="ویژگی‌های ما"
                        fill
                        priority={false}
                        quality={85}
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>

                {/* ===== Overlay تیره برای خوانایی ===== */}
                <div className="absolute inset-0 bg-gradient-to-b from-cream-50/80 via-cream-50/60 to-cream-50/80 dark:from-night-950/85 dark:via-night-950/75 dark:to-night-950/85" />

                {/* ===== محتوا ===== */}
                <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-12 py-16 md:py-24 max-w-7xl mx-auto">
                    {/* هدر بخش */}

                    <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features_about.map((item, index) => (
                            <li
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 backdrop-blur-[7px] bg-white/10 dark:bg-black/10 border border-white/20 hover:border-white/40 hover:bg-white/15"
                            >
                                {/* شماره پس‌زمینه بزرگ */}
                                <span
                                    className={`${almarai.className} absolute top-3 left-4 text-5xl font-bold text-black/10 dark:text-white/10 group-hover:text-black/40 dark:group-hover:text-white/30 group-hover:scale-125 transition-all duration-500 select-none`}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* گرادیان ملایم داخل کارت */}
                                <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* محتوا */}
                                <div className="relative z-10 flex flex-col items-center">
                                    {/* آیکون */}
                                    <div className="w-20 h-20 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 text-night-700 dark:text-cream-50 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-cream-50 group-hover:text-night-950 group-hover:border-cream-50 group-hover:rotate-[10deg] group-hover:scale-110">
                                        {item.icon}
                                    </div>

                                    <h3
                                        className={`${almarai.className} mt-5 text-xl font-bold text-night-700 dark:text-cream-50 `}
                                    >
                                        {item.title}
                                    </h3>

                                    <span className="mt-3 block h-0.5 w-8 bg-night-700/70 dark:bg-cream-50/50 transition-all duration-500 group-hover:w-16 group-hover:bg-night-700 group-hover:dark:bg-cream-50" />

                                    <p className="mt-4 text-base leading-7 text-night-700/80 dark:text-cream-50/50 transition-colors duration-300">
                                        {item.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Story */}
            <section className="px-5 sm:px-8 md:px-10 lg:px-12 mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                <h2
                    className={`${estedad.className} text-2xl md:text-3xl font-semibold md:col-span-1`}
                >
                    چرا این پلتفرم را ساختیم
                </h2>
                <div
                    className={`md:col-span-2 space-y-4 text-base md:text-xl text-night-700/70 dark:text-cream-50/50 max-w-[65ch]`}
                >
                    <p>
                        خرید و انتخاب آسانسور نباید سخت‌تر از خودِ استفاده از آن
                        باشد. بیشتر منابع موجود یا پر از اصطلاحات فنی‌اند یا
                        اطلاعاتشان ناقص است، و همین باعث می‌شود انتخاب درست
                        زمان‌بر و پر از تردید شود.
                    </p>
                    <p>
                        ما این پلتفرم را ساده نگه داشتیم: صفحات واضح، مشخصات
                        دقیق و جایی برای ذخیره‌ی مدل‌هایی که به آن‌ها علاقه
                        دارید. روی موبایل، تبلت یا لپ‌تاپ یکسان کار می‌کند تا
                        انتخاب شما همیشه همراهتان باشد.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 sm:px-8 md:px-10 lg:px-12 mt-16 md:mt-24 rounded-lg border border-amber-100 dark:border-cream-50/10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h2
                        className={`${estedad.className} text-2xl md:text-3xl font-semibold`}
                    >
                        آماده‌اید انتخاب را شروع کنید؟
                    </h2>
                    <p className="mt-2 text-xl text-night-700 dark:text-cream-50">
                        ابتدا وارد حساب کاربری خود شوید
                    </p>
                </div>
                <Link
                    href="/login"
                    className={`${estedad.className} bg-red-600 dark:bg-red-400 text-cream-50 px-4 py-2 rounded-sm text-center hover:-translate-y-0.5 transition-all duration-300 md:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500`}
                >
                    ورود به حساب کاربری
                </Link>
            </section>
        </main>
    );
}

export default AboutPage;
