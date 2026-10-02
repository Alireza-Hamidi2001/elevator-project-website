import { almarai } from "@/app/layout";

export const metadata = {
    title: "خدمات",
};

function ServicesSection() {
    return (
        <main
            id="services"
            dir="rtl"
            className="w-full my-[4rem] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 max-w-7xl py-10 md:py-16 lg:py-20 text-night-700 dark:text-cream-50">
            <section className="text-center max-w-3xl mx-auto">
                <h1
                    className={`${almarai.className} text-3xl md:text-4xl lg:text-5xl font-bold`}>
                    خدمات ما
                </h1>
                <p className="mt-4 text-lg md:text-xl text-night-700/70 dark:text-cream-50/60 leading-8">
                    از مشاوره و انتخاب تا نصب، راهاندازی و سرویس دورهای — تمام
                    آنچه برای یک آسانسور مطمئن و بیدغدغه نیاز دارید، یکجا در
                    اختیار شماست.
                </p>
                <div className="mt-6 h-1 w-20 bg-night-700 dark:bg-cream-50 mx-auto rounded-full" />
            </section>
        </main>
    );
}

export default ServicesSection;
