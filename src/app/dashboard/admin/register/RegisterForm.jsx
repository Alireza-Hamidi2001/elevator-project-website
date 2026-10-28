// app/dashboard/admin/register/RegisterForm.jsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import PasswordInputWithConfirm from "../../../components/PasswordInputWithConfirm";
import GenderSelect from "../../../components/GenderSelect";
import { registerAction } from "./actions";
import CustomSelect from "@/app/components/CustomSelect";
import { toast } from "@/app/components/toast";
import { almarai } from "@/app/_fonts/fonts";
import PersianDatePicker from "@/app/components/PersianDatePicker";
import SpinnerMini from "@/app/components/SpinnerMini";

// دکمه جداگانه
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/60 disabled:cursor-not-allowed text-white rounded-md py-2.5 mt-2 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-[1.2rem] sm:text-[1.4rem]"
        >
            {pending ? (
                <p className="flex items-center gap-2 text-[1rem]">
                    <SpinnerMini />
                    در حال ثبت
                </p>
            ) : (
                <p className="text-[1rem]">ایجاد حساب کاربری</p>
            )}
        </button>
    );
}

const initialFormState = {
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
    contractEndDate: "",
};

// ────────────────────────────────────────────────────────
// ۱. کامپوننت داخلی (فرم اصلی)
// ────────────────────────────────────────────────────────
function RegisterFormContent({ onSuccess }) {
    const [state, formAction] = useActionState(registerAction, {
        ok: null,
        errors: {},
        message: "",
        ts: null,
    });

    const [form, setForm] = useState(initialFormState);

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    // فقط برای Toast
    useEffect(() => {
        if (state.message && state.ts) {
            if (state.ok) {
                toast.success(state.message);
                onSuccess(); // 👈 به جای setForm، به والد می‌گیم که فرم رو ریست کنه
            } else {
                toast.error(state.message);
            }
        }
    }, [state.ts, state.ok, state.message, onSuccess]);

    const errors = state.errors || {};

    const baseInput =
        "border rounded-md px-3 py-2 outline-none focus:ring-1 transition-all duration-300";
    const normalBorder =
        "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500/50";
    const errorBorder = "border-red-500 focus:ring-red-500/50";

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 p-6 md:p-8"
        >
            <div>
                <h1
                    className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                >
                    ثبت نام
                </h1>
                <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                    برای ساخت حساب کاربری جدید اطلاعات فرم زیر را تکمیل نمایید.
                </p>
            </div>

            {/* نام و نام خانوادگی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="firstName"
                        className="text-[1rem] font-medium"
                    >
                        &bull; نام
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        className={`placeholder:text-[0.8rem] ${baseInput} ${
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
                        className="text-[1rem] font-medium"
                    >
                        &bull; نام خانوادگی
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="نام خانوادگی خود را وارد کنید"
                        className={`placeholder:text-[0.8rem] ${baseInput} ${
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
            <input
                type="hidden"
                name="gender"
                value={form.gender}
            />

            {/* کد ملی */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="nationalId"
                    className="text-[1rem] font-medium"
                >
                    &bull; کد ملی
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
                    className={`placeholder:text-[0.8rem] ${baseInput} ${
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
                    className="text-[1rem] font-medium"
                >
                    &bull; شماره تلفن
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
                    className={`placeholder:text-[0.8rem] text-right ${baseInput} ${
                        errors.phone ? errorBorder : normalBorder
                    }`}
                />
                {errors.phone && (
                    <span className="text-xs text-red-500">{errors.phone}</span>
                )}
            </div>

            {/* نقش */}
            <div className="flex flex-col gap-2">
                <label className="text-[1rem] font-medium">&bull; نقش</label>
                <CustomSelect
                    name="role"
                    value={form.role}
                    onChange={(v) => update("role", v)}
                    placeholder="انتخاب نقش کاربری"
                    options={[
                        { value: "user", label: "کاربر عادی" },
                        { value: "admin", label: "مدیر" },
                    ]}
                    error={errors.role}
                />
                {errors.role && (
                    <span className="text-xs text-red-500">{errors.role}</span>
                )}
            </div>

            {/* شغل / سمت */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="jobTitle"
                    className="text-[1rem] font-medium"
                >
                    &bull; شغل یا سمت{" "}
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
                    className={`placeholder:text-[0.8rem] ${baseInput} ${
                        errors.jobTitle ? errorBorder : normalBorder
                    }`}
                />
                {errors.jobTitle && (
                    <span className="text-xs text-red-500">
                        {errors.jobTitle}
                    </span>
                )}
            </div>

            {/* ایمیل */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-[1rem] font-medium"
                >
                    &bull; ایمیل{" "}
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
                    className={`placeholder:text-[0.8rem] text-right ${baseInput} ${
                        errors.email ? errorBorder : normalBorder
                    }`}
                />
                {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                )}
            </div>

            {/* تاریخ پایان قرارداد */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="contractEndDate"
                    className="text-[1rem] font-medium"
                >
                    &bull; تاریخ پایان قرارداد
                </label>
                <PersianDatePicker
                    name="contractEndDate"
                    value={form.contractEndDate}
                    onChange={(v) => update("contractEndDate", v)}
                    error={errors.contractEndDate}
                />
                {errors.contractEndDate && (
                    <span className="text-xs text-red-500">
                        {errors.contractEndDate}
                    </span>
                )}
            </div>

            {/* رمز عبور */}
            <PasswordInputWithConfirm
                password={form.password}
                confirmPassword={form.confirmPassword}
                onPasswordChange={(v) => update("password", v)}
                onConfirmChange={(v) => update("confirmPassword", v)}
                errors={errors}
            />

            <SubmitButton />
        </form>
    );
}

// ────────────────────────────────────────────────────────
// ۲. کامپوننت اصلی (فقط مدیریت key)
// ────────────────────────────────────────────────────────
export default function RegisterForm() {
    const [formKey, setFormKey] = useState(0);

    return (
        <RegisterFormContent
            key={formKey}
            onSuccess={() => setFormKey((prev) => prev + 1)}
        />
    );
}
