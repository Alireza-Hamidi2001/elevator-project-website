// app/dashboard/admin/users/UserList.jsx
import { createClient } from "@/lib/supabase/server";
import UserStatusToggle from "./UserStatusToggle";
import Pagination from "./Pagination";
import PersianNumber from "@/app/components/PersianNumber";

export default async function UserList({ searchParams }) {
    const supabase = await createClient();
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser();

    // تنظیمات Pagination
    const page = Number(searchParams?.page) || 1;
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // دریافت دیتا با شمارش کل
    const {
        data: users,
        count,
        error,
    } = await supabase
        .from("profiles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        return (
            <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
                خطا در دریافت اطلاعات کاربران.
            </div>
        );
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return (
        <div className="space-y-6">
            <div className="overflow-x-auto rounded-sm shadow-sm">
                <table className="w-full text-right text-sm border border-cream-200 dark:border-night-700">
                    <thead className="bg-cream-50 dark:bg-night-800 text-night-700 dark:text-cream-50 border-b border-cream-200 dark:border-night-700">
                        <tr>
                            <th className="px-4 py-3 font-medium whitespace-nowrap">
                                نام و نام خانوادگی
                            </th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap">
                                شماره موبایل
                            </th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap hidden sm:table-cell">
                                کد ملی
                            </th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap">
                                نقش
                            </th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap">
                                وضعیت
                            </th>
                            <th className="px-4 py-3 font-medium text-center whitespace-nowrap">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-night-700/5 dark:divide-cream-50/5">
                        {users?.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-cream-50 dark:hover:bg-night-800/50 transition-colors"
                            >
                                <td className="px-4 py-3">
                                    <div className="font-medium text-night-900 dark:text-cream-50">
                                        {user.first_name} {user.last_name}
                                    </div>
                                </td>
                                <td
                                    className="px-4 py-3 text-night-700/70 dark:text-cream-50/70"
                                    dir="ltr"
                                >
                                    <PersianNumber value={user.phone} />
                                </td>
                                <td className="px-4 py-3 text-night-700/70 dark:text-cream-50/70 hidden sm:table-cell">
                                    <PersianNumber value={user.national_id} />
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                                            user.role === "admin"
                                                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                                                : "bg-night-700/5 text-night-700 dark:bg-cream-50/10 dark:text-cream-50"
                                        }`}
                                    >
                                        {user.role === "admin"
                                            ? "مدیر"
                                            : "کاربر"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                            user.is_active
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-red-600 dark:text-red-400"
                                        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                user.is_active
                                                    ? "bg-emerald-500 animate-pulse"
                                                    : "bg-red-500"
                                            }`}
                                        />
                                        {user.is_active ? "فعال" : "غیرفعال"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <UserStatusToggle
                                        userId={user.id}
                                        isActive={user.is_active}
                                        isCurrentUser={
                                            user.id === currentUser?.id
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {(!users || users.length === 0) && (
                    <div className="p-12 text-center text-night-700/50 dark:text-cream-50/50 bg-white dark:bg-night-900">
                        هیچ کاربری یافت نشد.
                    </div>
                )}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
            />
        </div>
    );
}
