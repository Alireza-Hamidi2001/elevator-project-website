// app/dashboard/admin/users/page.jsx
import { almarai, estedad } from "@/app/_fonts/fonts";
import { Fallback } from "@/app/components/Fallback";
import { Suspense } from "react";
import UserList from "./UserList";

export const metadata = { title: "مدیریت کاربران" };

export default async function AdminUsersPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const pageKey = resolvedParams?.page || "1";

    return (
        <div className="py-6 px-4 sm:px-6 bg-white dark:bg-night-900 shadow-sm overflow-auto h-[calc(100vh-4rem)]">
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1
                        className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                    >
                        مدیریت کاربران
                    </h1>
                    <p
                        className={`${estedad.className} mt-1 text-sm text-night-700/60 dark:text-cream-50/60`}
                    >
                        مشاهده لیست کاربران، بررسی اطلاعات و کنترل وضعیت دسترسی
                        آن‌ها.
                    </p>
                </div>

                <Suspense
                    key={pageKey}
                    fallback={<Fallback message=" در حال دریافت اطلاعات" />}
                >
                    <UserList searchParams={resolvedParams} />
                </Suspense>
            </div>
        </div>
    );
}
