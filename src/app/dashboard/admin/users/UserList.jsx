// app/dashboard/admin/users/UserList.jsx
import { createClient } from "@/lib/supabase/server";
import UserStatusToggle from "./UserStatusToggle";
import ViewUserButton from "./ViewUserButton";
import Pagination from "./Pagination";
import PersianNumber from "@/app/components/PersianNumber";

export default async function UserList({ searchParams }) {
    const supabase = await createClient();
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser();

    const page = Number(searchParams?.page) || 1;
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

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
                <table className="w-full overflow-x-auto text-right text-sm border border-cream-200 dark:border-night-700">
                    <thead className="bg-cream-50 dark:bg-night-800 text-night-700 dark:text-cream-50 border-b border-cream-200 dark:border-night-700">
                        <tr>
                            <th className="border-l border-cream-200 dark:border-night-700 px-4 py-3 font-medium text-center whitespace-nowrap">
                                نام و نام خانوادگی
                            </th>
                            <th className="border-l border-cream-200 dark:border-night-700 px-4 py-3 font-medium text-center whitespace-nowrap">
                                شماره موبایل
                            </th>
                            <th className="border-l border-cream-200 dark:border-night-700 px-4 py-3 font-medium text-center whitespace-nowrap hidden sm:table-cell">
                                کد ملی
                            </th>
                            <th className="border-l border-cream-200 dark:border-night-700 px-4 py-3 font-medium text-center whitespace-nowrap">
                                نقش
                            </th>
                            <th className="border-l border-cream-200 dark:border-night-700 px-4 py-3 font-medium text-center whitespace-nowrap">
                                وضعیت
                            </th>
                            <th className="px-4 py-3 font-medium text-center whitespace-nowrap">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-night-900 divide-y divide-night-700/5 dark:divide-cream-50/5">
                        {users?.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-cream-50 dark:hover:bg-night-800/50 transition-colors"
                            >
                                {/* ستون نام و نام خانوادگی */}
                                <td className="px-4 py-3 min-w-max">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 overflow-hidden shrink-0">
                                            {user.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt={user.first_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="font-bold text-sm">
                                                    {user.first_name?.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        {/* whitespace-nowrap باعث میشه متن به خط بعد نره */}
                                        <span className="text-sm text-night-800 dark:text-cream-50 whitespace-nowrap">
                                            {user.first_name} {user.last_name}
                                        </span>
                                    </div>
                                </td>

                                <td
                                    className="px-4 py-3 text-night-700/70 dark:text-cream-50/70 whitespace-nowrap"
                                    dir="ltr"
                                >
                                    <PersianNumber value={user.phone} />
                                </td>
                                <td className="px-4 py-3 text-night-700/70 dark:text-cream-50/70 hidden sm:table-cell whitespace-nowrap">
                                    <PersianNumber value={user.national_id} />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
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
                                <td className="px-4 py-3 whitespace-nowrap">
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
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <ViewUserButton userId={user.id} />
                                        <UserStatusToggle
                                            userId={user.id}
                                            isActive={user.is_active}
                                            isCurrentUser={
                                                user.id === currentUser?.id
                                            }
                                        />
                                    </div>
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
