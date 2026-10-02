import { almarai } from "@/app/layout";
import UserCard from "./UserCard";

export const metadata = {
    title: "کاربران",
    description: "لیست کاربران ثبت‌شده در سیستم",
};

// داده‌های سمپل — بعداً از دیتابیس بخون
const sampleUsers = [
    {
        id: 1,
        firstName: "علی",
        lastName: "رضایی",
        gender: "male",
        nationalId: "0012345678",
        phone: "09123456789",
        email: "ali.rezaei@example.com",
        role: "مدیر",
        status: "active",
    },
    {
        id: 2,
        firstName: "سارا",
        lastName: "محمدی",
        gender: "female",
        nationalId: "0087654321",
        phone: "09387654321",
        email: "sara.mohammadi@example.com",
        role: "کارشناس فروش",
        status: "active",
    },
];

export default function UsersPage() {
    return (
        <main
            dir="rtl"
            className="w-full mx-auto max-w-7xl px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12  text-night-700 dark:text-cream-50"
        >
            {/* هدر */}
            <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                <h1
                    className={`${almarai.className} text-2xl sm:text-3xl lg:text-4xl font-bold`}
                >
                    کاربران
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-night-700/70 dark:text-cream-50/60">
                    لیست کاربران ثبت‌شده در سیستم
                </p>
                <div className="mt-5 sm:mt-6 h-1 w-16 sm:w-20 bg-night-700 dark:bg-cream-50 mx-auto rounded-full" />
            </header>

            {/* گرید کارت‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sampleUsers.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </main>
    );
}
