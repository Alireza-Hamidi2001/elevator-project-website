// app/dashboard/admin/users/UserList.jsx
import { createClient } from "@/lib/supabase/server";
import { FaUsers } from "react-icons/fa";
import UserActionsMenu from "./UserActionsMenu";
import Pagination from "./Pagination";
import PersianNumber from "@/app/components/PersianNumber";

const LIMIT = 10;

const LIST_COLUMNS =
    "id, first_name, last_name, phone, email, national_id, job_title, role, is_active, avatar_url";

const TH =
    "px-5 py-3.5 text-right text-xs font-semibold text-night-700/60 dark:text-cream-50/60 whitespace-nowrap";

export default async function UserList({ searchParams }) {
    const supabase = await createClient();
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser();

    const params = await searchParams;
    const page = Math.max(1, Number(params?.page) || 1);
    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    const {
        data: users,
        count,
        error,
    } = await supabase
        .from("profiles")
        .select(LIST_COLUMNS, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        return (
            <div className="rounded-2xl bg-red-50 p-6 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                خطا در دریافت اطلاعات کاربران.
            </div>
        );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className="space-y-4">
            <p className="px-1 text-sm text-night-700/60 dark:text-cream-50/60">
                مجموع {total.toLocaleString("fa-IR")} کاربر
            </p>

            <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white shadow-sm dark:border-night-700 dark:bg-night-900">
                <table className="w-full min-w-[40rem] text-sm">
                    <thead className="border-b border-cream-200 bg-cream-50/80 dark:border-night-700 dark:bg-night-800/60">
                        <tr>
                            <th className={TH}>کاربر</th>
                            <th className={TH}>اطلاعات تماس</th>
                            <th className={`${TH} hidden lg:table-cell`}>
                                کد ملی
                            </th>
                            <th className={TH}>نقش</th>
                            <th className={TH}>وضعیت</th>
                            <th className={`${TH} w-16 text-center`}>
                                <span className="sr-only">عملیات</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-cream-200 dark:divide-night-700">
                        {users?.map((user) => {
                            const isCurrentUser = user.id === currentUser?.id;
                            const fullName = `${user.first_name ?? ""} ${
                                user.last_name ?? ""
                            }`.trim();

                            return (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-cream-50/70 dark:hover:bg-night-800/60"
                                >
                                    {/* کاربر */}
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-sm font-bold text-blue-600 ring-1 ring-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-900/40">
                                                {user.avatar_url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={user.avatar_url}
                                                        alt={fullName}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span aria-hidden="true">
                                                        {user.first_name?.charAt(
                                                            0,
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="whitespace-nowrap font-medium text-night-900 dark:text-cream-50">
                                                        {fullName}
                                                    </span>
                                                    {isCurrentUser && (
                                                        <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[11px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                                            شما
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-0.5 whitespace-nowrap text-xs text-night-700/55 dark:text-cream-50/55">
                                                    {user.job_title || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* تماس */}
                                    <td className="px-5 py-3.5">
                                        <span
                                            dir="ltr"
                                            className="inline-block whitespace-nowrap font-medium text-night-800 dark:text-cream-50"
                                        >
                                            <PersianNumber value={user.phone} />
                                        </span>
                                        {user.email && (
                                            <p
                                                dir="ltr"
                                                className="mt-0.5 max-w-[13rem] truncate text-right text-xs text-night-700/55 dark:text-cream-50/55"
                                            >
                                                {user.email}
                                            </p>
                                        )}
                                    </td>

                                    {/* کد ملی */}
                                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-night-700/75 dark:text-cream-50/75 lg:table-cell">
                                        <PersianNumber
                                            value={user.national_id}
                                        />
                                    </td>

                                    {/* نقش */}
                                    <td className="whitespace-nowrap px-5 py-3.5">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                user.role === "admin"
                                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                                                    : "bg-night-700/5 text-night-700 dark:bg-cream-50/10 dark:text-cream-50"
                                            }`}
                                        >
                                            {user.role === "admin"
                                                ? "مدیر"
                                                : "کاربر"}
                                        </span>
                                    </td>

                                    {/* وضعیت */}
                                    <td className="whitespace-nowrap px-5 py-3.5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                user.is_active
                                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                                    : "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    user.is_active
                                                        ? "bg-emerald-500"
                                                        : "bg-red-500"
                                                }`}
                                            />
                                            {user.is_active
                                                ? "فعال"
                                                : "غیرفعال"}
                                        </span>
                                    </td>

                                    {/* عملیات */}
                                    <td className="px-5 py-3.5 text-center">
                                        <UserActionsMenu
                                            user={user}
                                            isCurrentUser={isCurrentUser}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {(!users || users.length === 0) && (
                    <div className="flex flex-col items-center gap-3 px-6 py-16 text-night-700/50 dark:text-cream-50/50">
                        <FaUsers className="h-8 w-8 opacity-60" />
                        <p className="text-sm">هیچ کاربری یافت نشد.</p>
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
