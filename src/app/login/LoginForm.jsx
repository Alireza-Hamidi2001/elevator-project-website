// app/login/LoginForm.jsx
"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/app/components/toast";
import PasswordInput from "../components/PasswordInput";
import { loginAction, debugLogin } from "./actions";

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(loginAction, {
        ok: null,
        message: "",
    });
    const params = useSearchParams();

    useEffect(() => {
        if (params.get("error") === "inactive") {
            toast.error("حساب شما غیرفعال شده است.");
        }
    }, [params]);

    useEffect(() => {
        if (state.message && !state.ok) toast.error(state.message);
    }, [state.ts]);

    return (
        <form
            action={formAction}
            className="flex flex-col justify-center gap-2 p-6 md:p-8 bg-white dark:bg-night-800 text-night-700 dark:text-cream-50"
        >
            <div className="flex flex-col justify-center gap-2">
                <label
                    htmlFor="username"
                    className="text-sm font-medium"
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
                    className="text-right border border-night-700/10 dark:border-cream-50/10 mb-3 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
            </div>

            <PasswordInput />

            <button
                type="submit"
                disabled={pending}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-md py-2 transition"
            >
                {pending ? "در حال ورود..." : "ورود"}
            </button>
        </form>
    );
}
