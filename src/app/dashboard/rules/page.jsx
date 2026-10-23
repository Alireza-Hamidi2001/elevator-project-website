// app/terms/page.jsx

import { almarai, estedad } from "@/app/_fonts/fonts";

export const metadata = { title: "قوانین و مقررات" };

export default function TermsPage() {
    return (
        <div className="overflow-auto py-6 px-6 text-night-700 dark:text-cream-50 h-[calc(100vh-4rem)] bg-white dark:bg-night-900 shadow-sm">
            <div className="">
                {/* هدر صفحه */}
                <header className="mb-6">
                    <h1
                        className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                    >
                        قوانین و مقررات
                    </h1>
                    <p
                        className={`${estedad.className} mt-1 text-sm text-night-700/60 dark:text-cream-50/60`}
                    >
                        شرکت درخشان آبادیس آسانبر{" "}
                    </p>
                </header>

                {/* مقدمه */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2`}
                    >
                        مقدمه
                    </h2>
                    <p
                        className={`text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        شرکت درخشان آبادیس آسانبر با هدف ارائه‌ی خدمات تخصصی در
                        زمینه‌ی طراحی، نصب، سرویس و تعمیر انواع آسانسور فعالیت
                        می‌کند. این قوانین و مقررات به منظور شفاف‌سازی روابط
                        میان شرکت و مشتریان گرامی تدوین شده است.{" "}
                        <strong className="font-bold text-night-900 dark:text-cream-50">
                            استفاده از خدمات شرکت به معنای پذیرش کامل این شرایط
                            است.
                        </strong>
                    </p>
                </section>

                {/* ماده ۱ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۱ — دامنه‌ی خدمات
                    </h2>
                    <p
                        className={`text-sm sm:text-base leading-8 mb-1 ${estedad.className}`}
                    >
                        ۱-۱. شرکت در حوزه‌های زیر خدمات ارائه می‌دهد:
                    </p>
                    <ul
                        className={`list-disc pr-6 space-y-1 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>طراحی و مشاوره‌ی فنی برای نصب آسانسور</li>
                        <li>نصب انواع آسانسورهای مسکونی، تجاری و صنعتی</li>
                        <li>سرویس دوره‌ای و نگهداری پیشگیرانه</li>
                        <li>تعمیرات تخصصی و رفع خرابی</li>
                        <li>بازرسی فنی و صدور گزارش سلامت دستگاه</li>
                    </ul>
                    <p
                        className={`mt-2 text-sm sm:text-base leading-8 ${estedad.className}`}
                    >
                        ۱-۲. خدمات شرکت تنها در محدوده‌ی جغرافیایی اعلام‌شده در
                        قرارداد ارائه می‌شود.
                    </p>
                </section>

                {/* ماده ۲ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۲ — شرایط قرارداد و سفارش
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۲-۱. ثبت سفارش و عقد قرارداد باید به صورت کتبی و با
                            امضای طرفین انجام شود.
                        </li>
                        <li>
                            <strong className="font-bold text-night-900 dark:text-cream-50">
                                ۲-۲. پیش‌فاکتور صادرشده از سوی شرکت، تا ۱۵ روز
                                کاری اعتبار دارد.
                            </strong>
                        </li>
                        <li>
                            ۲-۳. مشتری موظف است اطلاعات صحیح و کامل از محل نصب،
                            تعداد طبقات، بار مجاز و شرایط ساختمان ارائه دهد.
                        </li>
                        <li>
                            ۲-۴. هرگونه تغییر در مشخصات فنی یا شرایط نصب، مستلزم
                            تنظیم الحاقیه‌ی قرارداد است.
                        </li>
                    </ul>
                </section>

                {/* ماده ۳ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۳ — زمان‌بندی و اجرا
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۳-۱. زمان‌بندی تحویل و نصب بر اساس توافق طرفین در
                            قرارداد درج می‌شود.
                        </li>
                        <li>
                            ۳-۲. تأخیر ناشی از عوامل خارج از کنترل شرکت (مانند
                            شرایط جوی، قطعی برق، محدودیت‌های شهرداری یا تأخیر در
                            تأمین قطعات از سوی تأمین‌کننده) موجب مسئولیت شرکت
                            نیست.
                        </li>
                        <li>
                            ۳-۳. مشتری موظف است در زمان اجرا، دسترسی لازم به محل
                            نصب را فراهم کند.
                        </li>
                    </ul>
                </section>

                {/* ماده ۴ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۴ — خدمات پس از فروش و گارانتی
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۴-۱. کلیه‌ی آسانسورهای نصب‌شده، مشمول گارانتی
                            مشخص‌شده در قرارداد هستند.
                        </li>
                        <li>
                            <strong className="font-bold text-night-900 dark:text-cream-50">
                                ۴-۲. گارانتی شامل قطعات مصرفی، خرابی ناشی از
                                استفاده‌ی نادرست، تغییرات غیرمجاز یا حوادث
                                غیرمترقبه نمی‌شود.
                            </strong>
                        </li>
                        <li>
                            <strong className="font-bold text-night-900 dark:text-cream-50">
                                ۴-۳. سرویس دوره‌ای ماهانه، شرط حفظ اعتبار
                                گارانتی است.
                            </strong>
                        </li>
                        <li>
                            ۴-۴. مشتری موظف است هرگونه نقص یا خرابی را بلافاصله
                            به شرکت اطلاع دهد.
                        </li>
                    </ul>
                </section>

                {/* ماده ۵ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۵ — تعهدات مشتری
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۵-۱. رعایت ظرفیت بار و تعداد نفرات مجاز اعلام‌شده
                        </li>
                        <li>
                            ۵-۲. عدم انجام هرگونه تغییر یا تعمیر خودسرانه در
                            سیستم آسانسور
                        </li>
                        <li>
                            ۵-۳. فراهم کردن شرایط ایمنی و دسترسی لازم برای تیم
                            فنی شرکت
                        </li>
                        <li>۵-۴. پرداخت به‌موقع اقساط یا هزینه‌های خدمات</li>
                    </ul>
                </section>

                {/* ماده ۶ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۶ — ایمنی و مسئولیت
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۶-۱. شرکت متعهد است کلیه‌ی عملیات نصب و تعمیر را
                            مطابق استانداردهای ملی و بین‌المللی ایمنی آسانسور
                            انجام دهد.
                        </li>
                        <li>
                            <strong className="font-bold text-night-900 dark:text-cream-50">
                                ۶-۲. مسئولیت حوادث ناشی از استفاده‌ی نادرست، بار
                                بیش از حد مجاز یا دستکاری غیرمجاز در سیستم، بر
                                عهده‌ی مشتری است.
                            </strong>
                        </li>
                        <li>
                            ۶-۳. شرکت در قبال خسارات غیرمستقیم، تبعی یا از دست
                            رفتن درآمد، مسئولیتی ندارد.
                        </li>
                    </ul>
                </section>

                {/* ماده ۷ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۷ — هزینه‌ها و پرداخت
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۷-۱. کلیه‌ی هزینه‌ها بر اساس پیش‌فاکتور و قرارداد
                            دریافت می‌شود.
                        </li>
                        <li>
                            <strong className="font-bold text-night-900 dark:text-cream-50">
                                ۷-۲. در صورت تأخیر در پرداخت، شرکت حق توقف خدمات
                                تا تسویه را دارد.
                            </strong>
                        </li>
                        <li>
                            ۷-۳. هزینه‌ی بازدیدهای مازاد یا خدمات خارج از
                            قرارداد، جداگانه محاسبه می‌شود.
                        </li>
                    </ul>
                </section>

                {/* ماده ۸ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۸ — فسخ قرارداد
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۸-۱. هر یک از طرفین می‌تواند در صورت نقض تعهدات طرف
                            مقابل، با اطلاع کتبی، قرارداد را فسخ کند.
                        </li>
                        <li>
                            ۸-۲. در صورت فسخ از سوی مشتری پس از شروع عملیات
                            اجرایی، هزینه‌های انجام‌شده تا آن مرحله دریافت
                            می‌شود.
                        </li>
                    </ul>
                </section>

                {/* ماده ۹ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۹ — محرمانگی
                    </h2>
                    <p
                        className={`text-sm sm:text-base leading-8 ${estedad.className}`}
                    >
                        ۹-۱. اطلاعات مشتریان نزد شرکت محفوظ است و بدون رضایت
                        آن‌ها در اختیار اشخاص ثالث قرار نمی‌گیرد، مگر در مواردی
                        که قانون الزام کند.
                    </p>
                </section>

                {/* ماده ۱۰ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۱۰ — حل اختلاف
                    </h2>
                    <ul
                        className={`list-disc pr-6 space-y-2 text-sm sm:text-base leading-8 text-night-700/80 dark:text-cream-50/70 ${estedad.className}`}
                    >
                        <li>
                            ۱۰-۱. در صورت بروز اختلاف، طرفین ابتدا از طریق
                            مذاکره تلاش می‌کنند موضوع را حل کنند.
                        </li>
                        <li>
                            ۱۰-۲. در صورت عدم توافق، مرجع رسیدگی، دادگاه‌های
                            صالح شهر مشهد خواهد بود.
                        </li>
                    </ul>
                </section>

                {/* ماده ۱۱ */}
                <section className="mb-8">
                    <h2
                        className={`${almarai.className} text-lg sm:text-xl font-bold mb-2 text-night-900 dark:text-cream-50`}
                    >
                        ماده ۱۱ — تغییر در قوانین
                    </h2>
                    <p
                        className={`text-sm sm:text-base leading-8 ${estedad.className}`}
                    >
                        ۱۱-۱. شرکت حق به‌روزرسانی این قوانین را در هر زمان محفوظ
                        می‌دارد.{" "}
                        <strong className="font-bold text-night-900 dark:text-cream-50">
                            نسخه‌ی معتبر، آخرین نسخه‌ی منتشرشده در وب‌سایت رسمی
                            شرکت است.
                        </strong>
                    </p>
                </section>

                {/* فوتر */}
                <footer className="mt-10 pt-5 border-t border-night-700/10 dark:border-cream-50/10 text-sm text-night-700/60 dark:text-cream-50/50">
                    <p className={`${estedad.className}`}>
                        <strong className="font-bold text-night-900 dark:text-cream-50">
                            آخرین به‌روزرسانی:
                        </strong>{" "}
                        [تاریخ]
                    </p>
                    <p className={`mt-2 ${estedad.className}`}>
                        برای کسب اطلاعات بیشتر یا پرسش درباره‌ی این قوانین، با
                        شماره‌ی{" "}
                        <strong className="font-bold text-night-900 dark:text-cream-50">
                            [شماره تماس]
                        </strong>{" "}
                        یا ایمیل{" "}
                        <strong className="font-bold text-night-900 dark:text-cream-50">
                            [ایمیل]
                        </strong>{" "}
                        در تماس باشید.
                    </p>
                </footer>
            </div>
        </div>
    );
}
