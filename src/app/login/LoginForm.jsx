// app/login/LoginForm.jsx
"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/app/components/toast";
import PasswordInput from "../components/PasswordInput";
import { loginAction } from "./actions";
import SpinnerMini from "../components/SpinnerMini";
import { FaArrowRight } from "react-icons/fa";
import { almarai } from "@/app/_fonts/fonts";

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(loginAction, {
        ok: null,
        message: "",
        ts: null,
    });
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (params.get("error") === "inactive") {
            toast.error("حساب شما غیرفعال شده است. با پشتیبانی تماس بگیرید.");
            // پاک کردن پارامتر از URL
            router.replace("/login");
        }
    }, [params, router]);

    useEffect(() => {
        if (state.message && !state.ok) toast.error(state.message);
    }, [state.ts]);

    return (
        <div className="relative flex flex-col">
            {/* هدر فرم: دکمه بازگشت */}
            <div className="flex items-center justify-between p-4 border-b border-night-700/5 dark:border-cream-50/5 bg-white/50 dark:bg-night-800/50 backdrop-blur-sm">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-night-700/70 hover:text-blue-600 dark:text-cream-50/70 dark:hover:text-blue-400 transition-colors"
                >
                    <FaArrowRight className="w-3 h-3" />
                    بازگشت به صفحه اصلی
                </Link>
            </div>

            {/* بدنه فرم */}
            <form
                action={formAction}
                className="flex flex-col justify-center gap-5 p-6 md:p-8 bg-white/80 dark:bg-night-800/80 backdrop-blur-md"
            >
                <div className="text-center mb-2">
                    <h1
                        className={`${almarai.className} text-2xl font-bold text-night-900 dark:text-cream-50 mb-2`}
                    >
                        خوش آمدید
                    </h1>
                    <p className="text-sm text-night-700/60 dark:text-cream-50/60">
                        برای ورود به پنل کاربری، اطلاعات خود را وارد کنید.
                    </p>
                </div>

                <div className="flex flex-col justify-center gap-2">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-night-700 dark:text-cream-50"
                    >
                        شماره موبایل
                    </label>
                    <input
                        type="tel"
                        id="username"
                        name="username"
                        inputMode="numeric"
                        maxLength={11}
                        dir="ltr"
                        placeholder="09123456789"
                        className="text-right border border-night-700/10 dark:border-cream-50/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 bg-cream-50/50 dark:bg-night-900/50"
                    />
                </div>

                <PasswordInput />

                <button
                    type="submit"
                    disabled={pending}
                    className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 text-white rounded-lg py-3 font-medium shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                    {pending ? (
                        <p className="flex items-center justify-center gap-2">
                            <SpinnerMini />
                            درحال ورود
                        </p>
                    ) : (
                        <p>ورود به حساب</p>
                    )}
                </button>
            </form>
        </div>
    );
}
