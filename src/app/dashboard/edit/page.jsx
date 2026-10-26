// app/dashboard/edit/page.jsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";
import { almarai } from "@/app/_fonts/fonts";

export const metadata = { title: "ویرایش پروفایل" };

export default async function EditProfilePage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // دریافت اطلاعات پروفایل از دیتابیس
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) {
        return (
            <div className="p-6 text-red-500 text-center">
                پروفایلی یافت نشد.
            </div>
        );
    }

    return (
        <div className="overflow-auto py-6 px-4 sm:px-6 text-night-700 dark:text-cream-50 min-h-[calc(100vh-4rem)] bg-white dark:bg-night-900 shadow-sm">
            <div className="w-full mx-auto max-w-2xl rounded-lg overflow-hidden text-night-700 dark:text-cream-50">
                <div className="p-6 md:p-8">
                    <div>
                        <h1
                            className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                        >
                           ویرایش
                        </h1>
                        <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                           اطلاعات کاربری خود را بروز کنید 
                        </p>
                    </div>

                    {/* پاس دادن دیتا به فرم */}
                    <EditProfileForm initialData={profile} />
                </div>
            </div>
        </div>
    );
}
