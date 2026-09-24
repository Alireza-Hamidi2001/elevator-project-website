// components/Footer.jsx
import {
    FaTelegramPlane,
    FaPhoneAlt,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { almarai } from "../layout";

const elevators = [
    { id: 1, name: "آسانسور خانگی", href: "#" },
    { id: 2, name: "آسانسور خودروبر", href: "#" },
    { id: 3, name: "آسانسور مسافربر", href: "#" },
    { id: 4, name: "آسانسور حمل بار", href: "#" },
    { id: 5, name: "آسانسور بیمارستانی", href: "#" },
    { id: 6, name: "آسانسور صنعتی", href: "#" },
];

const services = [
    { id: 1, name: "نصب و راه‌اندازی", href: "#" },
    { id: 2, name: "سرویس و نگهداری دوره‌ای", href: "#" },
    { id: 3, name: "تعمیرات تخصصی", href: "#" },
    { id: 4, name: "بازسازی و مدرن‌سازی", href: "#" },
    { id: 5, name: "تأمین قطعات یدکی", href: "#" },
    { id: 6, name: "مشاوره و طراحی", href: "#" },
];

export default function FooterCopy() {
    return (
        <footer className="w-full bg-cream-100 dark:bg-night-900 border-t border-amber-100 dark:border-night-800 text-cream-50">
            <div className="max-w-7xl mx-auto px-6 pt-14 pb-4">
                {/* گرید اصلی */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* ستون آسانسورها */}
                    <div>
                        <h3
                            className={`${almarai.className} text-[1.25rem] font-bold mb-5 text-night-700 dark:text-cream-50 relative inline-block
                            after:content-[''] after:absolute after:-bottom-2 after:right-0
                            after:w-10 after:h-[3px] after:bg-amber-500 after:rounded-full`}
                        >
                            انواع آسانسور
                        </h3>
                        <ul className="space-y-3 mt-6">
                            {elevators.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={item.href}
                                        className="text-night-700/70 dark:text-cream-50/50 hover:text-night-700 dark:hover:text-cream-50  transition-colors duration-300
                                flex items-center gap-2 group"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ستون خدمات */}
                    <div>
                        <h3
                            className={`${almarai.className} text-[1.25rem] font-bold mb-5 text-night-700 dark:text-cream-50 relative inline-block
                            after:content-[''] after:absolute after:-bottom-2 after:right-0
                            after:w-10 after:h-[3px] after:bg-amber-500 after:rounded-full`}
                        >
                            خدمات
                        </h3>
                        <ul className="space-y-3 mt-6">
                            {services.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={item.href}
                                        className="text-night-700/70 dark:text-cream-50/50 hover:text-night-700 hover:dark:text-cream-50 transition-colors duration-300
                                flex items-center gap-2 group"
                                    >
                                        {" "}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ستون تماس */}
                    <div>
                        <h3
                            className={`${almarai.className} text-[1.25rem] font-bold mb-5 text-night-700 dark:text-cream-50 relative inline-block
                          after:content-[''] after:absolute after:-bottom-2 after:right-0
                          after:w-10 after:h-[3px] after:bg-amber-500 after:rounded-full`}
                        >
                            ارتباط با ما
                        </h3>
                        <ul className="space-y-4 mt-6">
                            {/* آیکون تلگرام */}
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 text-night-700 dark:text-cream-50 transition-colors duration-300 group"
                                >
                                    <span
                                        className="w-10 h-10 rounded-full
                               flex items-center justify-center transition-all duration-300"
                                    >
                                        <FaTelegramPlane size={30} />
                                    </span>
                                    <span>پشتیبانی تلگرام</span>
                                </a>
                            </li>

                            {/* آیکون تلفن همراه */}
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 text-night-700 dark:text-cream-50  transition-colors duration-300 group"
                                >
                                    <span
                                        className="w-10 h-10 rounded-full
                               flex items-center justify-center
                               transition-all duration-300"
                                    >
                                        <FaPhoneAlt size={30} />
                                    </span>
                                    <span>تماس تلفنی</span>
                                </a>
                            </li>

                            {/* آدرس */}
                            <li>
                                <div className="flex items-center gap-3 text-night-700 dark:text-cream-50">
                                    <span
                                        className="w-10 h-10 rounded-full 
                               flex items-center justify-center"
                                    >
                                        <FaMapMarkerAlt size={30} />
                                    </span>
                                    <span>تهران، خیابان نمونه، پلاک ۱۲</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* ستون ساعت کاری */}
                    <div>
                        <h3
                            className={`${almarai.className} text-[1.25rem] font-bold mb-5 text-night-700 dark:text-cream-50 relative inline-block
                          after:content-[''] after:absolute after:-bottom-2 after:right-0
                          after:w-10 after:h-[3px] after:bg-amber-500 after:rounded-full`}
                        >
                            ساعات کاری
                        </h3>
                        <div
                            className="mt-6 text-night-700 dark:text-cream-50 border border-cream-50 dark:border-night-900 rounded-lg p-5
                         flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <FaClock
                                    className=""
                                    size={20}
                                />
                                <span
                                    className={`${almarai.className}  font-bold`}
                                >
                                    همه روزه
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>شنبه تا جمعه</span>
                                <span
                                    className=" font-bold"
                                    dir="ltr"
                                >
                                    08:00 - 16:00
                                </span>
                            </div>
                            <div className="h-px bg-night-800" />
                            <p className="text-night-700/70 dark:text-cream-50/50 text-sm leading-relaxed">
                                پشتیبانی تلفنی و تلگرام به‌صورت شبانه‌روزی فعال
                                است.
                            </p>
                        </div>
                    </div>
                </div>

                {/* خط جداکننده و کپی‌رایت */}
                <div className="text-night-700 dark:text-cream-50 mt-6 py-6 border-t border-amber-100 dark:border-night-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className={`${almarai.className} text-sm`}>
                        © {new Date().getFullYear()} تمام حقوق محفوظ است.
                    </p>
                    <p className={`${almarai.className} text-sm`}>
                        طراحی و توسعه با ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
