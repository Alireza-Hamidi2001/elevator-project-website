"use client";

import { useState, useRef, useActionState, useEffect } from "react";
import GenderSelect from "@/app/components/GenderSelect";
import CustomSelect from "@/app/components/CustomSelect";
import { FaCamera } from "react-icons/fa";
import { estedad } from "@/app/_fonts/fonts";
import { updateProfileAction, uploadAvatarAction } from "./actions";
import { toast } from "@/app/components/toast";
import SpinnerMini from "@/app/components/SpinnerMini";

export default function EditProfileForm({ initialData }) {
    const [state, formAction, pending] = useActionState(updateProfileAction, {
        ok: null,
        errors: {},
        message: "",
        ts: null,
    });

    // استیت برای نمایش عکس (تغییر آنی پیش‌نمایش)
    const [preview, setPreview] = useState(initialData?.avatar_url || null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // استیت برای فیلدهای فرم
    const [form, setForm] = useState({
        firstName: initialData?.first_name || "",
        lastName: initialData?.last_name || "",
        gender: initialData?.gender || "",
        nationalId: initialData?.national_id || "",
        phone: initialData?.phone || "", // فقط نمایشی
        email: initialData?.email || "",
        jobTitle: initialData?.job_title || "",
        address: initialData?.address || "",
        role: initialData?.role || "user", // فقط نمایشی
    });

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    // هندل کردن آپلود عکس
    async function handleAvatarChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        // ۱. نمایش پیش‌نمایش فوری
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        // ۲. ارسال به سرور
        const formData = new FormData();
        formData.append("avatar", file);

        const res = await uploadAvatarAction(formData);
        setUploading(false);

        if (res?.error) {
            toast.error(res.error);
            setPreview(initialData?.avatar_url || null); // برگرداندن عکس قبلی در صورت خطا
        } else {
            toast.success("عکس پروفایل با موفقیت تغییر کرد.");
        }
    }

    // مدیریت Toast برای آپدیت موفق
    useEffect(() => {
        if (state.message && state.ts) {
            if (state.ok) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state.ts, state.ok, state.message]);

    const errors = state.errors || {};

    const baseInput =
        "border rounded-md px-3 py-2 outline-none focus:ring-1 transition-all duration-300";
    const normalBorder =
        "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500/50";
    const errorBorder = "border-red-500 focus:ring-red-500/50";

    return (
        <form
            action={formAction}
            className="flex flex-col gap-6"
        >
            {/* آواتار */}
            <div className="flex flex-col items-center my-4 gap-3">
                <div
                    className={`${estedad.className} relative w-24 h-24 rounded-full border border-night-700/10 dark:border-cream-50/10 bg-cream-50 dark:bg-night-800 flex items-center justify-center overflow-hidden group cursor-pointer`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="آواتار"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-night-700/30 dark:text-cream-50/30">
                            {form.firstName?.[0] || "؟"}
                        </span>
                    )}

                    {/* لایه رویی برای موقعیت آپلود */}
                    <div
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                            uploading
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                        {uploading ? (
                            <span className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                            <FaCamera className="text-white w-6 h-6" />
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                />
                <p className="text-xs text-night-700/60 dark:text-cream-50/60">
                    برای تغییر عکس کلیک کنید
                </p>
            </div>

            {/* نام */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">&bull; نام</label>
                    <input
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        className={`text-[0.9rem] placeholder:text-[0.8rem] ${baseInput} ${
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
                    <label className="text-sm font-medium">
                        &bull; نام خانوادگی
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="نام خانوادگی خود را وارد کنید"
                        className={`text-[0.9rem] placeholder:text-[0.8rem] ${baseInput} ${
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
                <label className="text-sm font-medium">&bull; کد ملی</label>
                <input
                    name="nationalId"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.nationalId}
                    onChange={(e) =>
                        update("nationalId", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="۱۰ رقم بدون خط تیره"
                    className={`text-[0.9rem] placeholder:text-[0.8rem] ${baseInput} ${
                        errors.nationalId ? errorBorder : normalBorder
                    }`}
                />
                {errors.nationalId && (
                    <span className="text-xs text-red-500">
                        {errors.nationalId}
                    </span>
                )}
            </div>

            {/* تلفن (غیرفعال) */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    &bull; شماره تلفن{" "}
                    <span className="text-xs opacity-60">(غیرقابل تغییر)</span>
                </label>
                <input
                    type="tel"
                    value={form.phone}
                    disabled
                    dir="ltr"
                    className={`text-[0.9rem] placeholder:text-[0.8rem] text-right opacity-40 cursor-not-allowed ${baseInput} ${normalBorder}`}
                />
                <input
                    type="hidden"
                    name="phone"
                    value={form.phone}
                />
            </div>

            {/* شغل */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    &bull; شغل یا سمت{" "}
                    <span className="text-xs opacity-60">(اختیاری)</span>
                </label>
                <input
                    name="jobTitle"
                    type="text"
                    value={form.jobTitle}
                    onChange={(e) => update("jobTitle", e.target.value)}
                    placeholder="مثلاً: تکنسین نصب"
                    className={`text-[0.9rem] placeholder:text-[0.8rem] ${baseInput} ${
                        errors.jobTitle ? errorBorder : normalBorder
                    }`}
                />
            </div>

            {/* ایمیل */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    &bull; ایمیل{" "}
                    <span className="text-xs opacity-60">(اختیاری)</span>
                </label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="example@mail.com"
                    dir="ltr"
                    className={`text-[0.9rem] placeholder:text-[0.8rem] text-right ${baseInput} ${
                        errors.email ? errorBorder : normalBorder
                    }`}
                />
            </div>

            {/* آدرس */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    &bull; آدرس{" "}
                    <span className="text-xs opacity-60">(اختیاری)</span>
                </label>
                <textarea
                    name="address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="آدرس خود را وارد کنید"
                    rows={3}
                    className={`text-[0.9rem] resize-none placeholder:text-[0.8rem] ${baseInput} ${
                        errors.address ? errorBorder : normalBorder
                    }`}
                />
            </div>

            <button
                type="submit"
                disabled={pending || uploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/60 disabled:cursor-not-allowed text-white rounded-md py-2.5 mt-2 flex items-center justify-center gap-2"
            >
                {pending ? (
                    <p className="flex items-center gap-2">
                        <SpinnerMini />
                        در حال ذخیره
                    </p>
                ) : (
                    "ذخیره تغییرات"
                )}
            </button>
        </form>
    );
}
