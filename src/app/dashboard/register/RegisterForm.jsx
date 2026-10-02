"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import PasswordInputWithConfirm from "../../components/PasswordInputWithConfirm";
import GenderSelect from "../../components/GenderSelect";
import { registerAction } from "./actions";

// دکمه جداگانه چون useFormStatus فقط داخل فرم کار می‌کنه
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/60 disabled:cursor-not-allowed text-white rounded-md py-2.5 mt-2 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    در حال ثبت...
                </>
            ) : (
                "ایجاد حساب کاربری"
            )}
        </button>
    );
}

export default function RegisterForm() {
    // state سرور: نتیجه اکشن
    const [state, formAction] = useActionState(registerAction, {
        ok: null,
        errors: {},
        message: "",
    });

    // state کلاینت برای کنترل فیلدها
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        nationalId: "",
        phone: "",
        email: "",
        role: "user",
        jobTitle: "",
        password: "",
        confirmPassword: "",
    });

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    const errors = state.errors || {};

    const baseInput =
        "border rounded-md px-3 py-2 outline-none focus:ring-2 transition-all duration-300";
    const normalBorder =
        "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500";
    const errorBorder = "border-red-500 focus:ring-red-500";

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 p-6 md:p-8"
        >
            <div className="text-center mb-2">
                <h1 className="text-2xl font-bold">ثبت‌نام</h1>
                <p className="mt-2 text-sm text-night-700/60 dark:text-cream-50/60">
                    برای ساخت حساب کاربری، اطلاعات زیر را کامل کنید
                </p>
            </div>

            {/* نام و نام خانوادگی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                    >
                        نام
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        className={`${baseInput} ${
                            errors.firstName ? errorBorder : normalBorder
                        }`}
                    />
                    {errors.firstName && (
                        <span className="text-xs text-red-500">
                            {errors.firstName}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="lastName"
                        className="text-sm font-medium"
                    >
                        نام خانوادگی
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="نام خانوادگی خود را وارد کنید"
                        className={`${baseInput} ${
                            errors.lastName ? errorBorder : normalBorder
                        }`}
                    />
                    {errors.lastName && (
                        <span className="text-xs text-red-500">
                            {errors.lastName}
                        </span>
                    )}
                </div>
            </div>

            {/* جنسیت */}
            <GenderSelect
                value={form.gender}
                onChange={(v) => update("gender", v)}
                error={errors.gender}
            />
            {/* فیلد مخفی برای ارسال مقدار به Server Action */}
            <input
                type="hidden"
                name="gender"
                value={form.gender}
            />

            {/* کد ملی */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="nationalId"
                    className="text-sm font-medium"
                >
                    کد ملی
                </label>
                <input
                    id="nationalId"
                    name="nationalId"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.nationalId}
                    onChange={(e) =>
                        update("nationalId", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="۱۰ رقم بدون خط تیره"
                    className={`${baseInput} ${
                        errors.nationalId ? errorBorder : normalBorder
                    }`}
                />
                {errors.nationalId && (
                    <span className="text-xs text-red-500">
                        {errors.nationalId}
                    </span>
                )}
            </div>

            {/* شماره تلفن */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="phone"
                    className="text-sm font-medium"
                >
                    شماره تلفن
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    value={form.phone}
                    onChange={(e) =>
                        update("phone", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="09123456789"
                    dir="ltr"
                    className={`text-right ${baseInput} ${
                        errors.phone ? errorBorder : normalBorder
                    }`}
                />
                {errors.phone && (
                    <span className="text-xs text-red-500">{errors.phone}</span>
                )}
            </div>
            {/* نقش */}
            {/* نقش */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="role"
                    className="text-sm font-medium"
                >
                    نقش
                </label>
                <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    className={`${baseInput} ${
                        errors.role ? errorBorder : normalBorder
                    }`}
                >
                    <option value="user">کاربر عادی</option>
                    <option value="admin">مدیر</option>
                </select>
                {errors.role && (
                    <span className="text-xs text-red-500">{errors.role}</span>
                )}
            </div>

            {/* شغل / سمت */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="jobTitle"
                    className="text-sm font-medium"
                >
                    شغل یا سمت{" "}
                    <span className="text-xs text-night-700/50 dark:text-cream-50/50">
                        (اختیاری)
                    </span>
                </label>
                <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={form.jobTitle}
                    onChange={(e) => update("jobTitle", e.target.value)}
                    placeholder="مثلاً: مدیر پروژه، تکنسین نصب"
                    className={`${baseInput} ${
                        errors.jobTitle ? errorBorder : normalBorder
                    }`}
                />
                {errors.jobTitle && (
                    <span className="text-xs text-red-500">
                        {errors.jobTitle}
                    </span>
                )}
            </div>

            {/* ایمیل (اختیاری) */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium"
                >
                    ایمیل{" "}
                    <span className="text-xs text-night-700/50 dark:text-cream-50/50">
                        (اختیاری)
                    </span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="example@mail.com"
                    dir="ltr"
                    className={`text-right ${baseInput} ${
                        errors.email ? errorBorder : normalBorder
                    }`}
                />
                {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                )}
            </div>

            {/* رمز عبور + تکرار */}
            <PasswordInputWithConfirm
                password={form.password}
                confirmPassword={form.confirmPassword}
                onPasswordChange={(v) => update("password", v)}
                onConfirmChange={(v) => update("confirmPassword", v)}
                errors={errors}
            />

            <SubmitButton />

            {/* پیام نتیجه از سرور */}
            {state.message && (
                <p
                    className={`text-sm text-center ${
                        state.ok
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-500"
                    }`}
                >
                    {state.ok ? "✓ " : "⚠ "}
                    {state.message}
                </p>
            )}
        </form>
    );
}
