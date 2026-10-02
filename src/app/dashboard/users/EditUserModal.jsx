"use client";

import { useState, useTransition, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import Modal from "./Modal";
import GenderSelect from "@/app/components/GenderSelect";

export default function EditUserModal({ isOpen, onClose, user, onSaved }) {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        nationalId: "",
        phone: "",
        email: "",
    });
    const [errors, setErrors] = useState({});

    // پر کردن فرم هر بار که مدال باز می‌شه
    useEffect(() => {
        if (isOpen && user) {
            setForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                gender: user.gender || "",
                nationalId: user.nationalId || "",
                phone: user.phone || "",
                email: user.email || "",
            });
            setErrors({});
        }
    }, [isOpen, user]);

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    }

    function validate() {
        const e = {};
        if (!form.firstName.trim()) e.firstName = "نام الزامی است";
        if (!form.lastName.trim()) e.lastName = "نام خانوادگی الزامی است";
        if (!form.gender) e.gender = "جنسیت را انتخاب کنید";
        if (!/^\d{10}$/.test(form.nationalId))
            e.nationalId = "کد ملی باید ۱۰ رقم باشد";
        if (!/^09\d{9}$/.test(form.phone)) e.phone = "شماره تلفن معتبر نیست";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "ایمیل معتبر نیست";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleSave() {
        if (!validate()) return;
        startTransition(async () => {
            // await updateUser(user.id, form);
            await new Promise((r) => setTimeout(r, 800));
            onSaved?.(user.id, form);
            onClose();
        });
    }

    const baseInput =
        "border rounded-md px-3 py-2 outline-none focus:ring-2 transition-all duration-300 w-full";
    const normalBorder =
        "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500";
    const errorBorder = "border-red-500 focus:ring-red-500";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="ویرایش کاربر"
        >
            <div className="flex flex-col gap-4">
                {/* نام و نام خانوادگی */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="edit-firstName"
                            className="text-sm font-medium"
                        >
                            نام
                        </label>
                        <input
                            id="edit-firstName"
                            type="text"
                            value={form.firstName}
                            onChange={(e) =>
                                update("firstName", e.target.value)
                            }
                            className={`${baseInput} text-night-700/50 dark:text-cream-50/50 ${
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
                            htmlFor="edit-lastName"
                            className="text-sm font-medium"
                        >
                            نام خانوادگی
                        </label>
                        <input
                            id="edit-lastName"
                            type="text"
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            className={`${baseInput} text-night-700/50 dark:text-cream-50/50 ${
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

                {/* کد ملی */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="edit-nationalId"
                        className="text-sm font-medium"
                    >
                        کد ملی
                    </label>
                    <input
                        id="edit-nationalId"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.nationalId}
                        onChange={(e) =>
                            update(
                                "nationalId",
                                e.target.value.replace(/\D/g, ""),
                            )
                        }
                        className={`${baseInput} text-night-700/50 dark:text-cream-50/50 ${
                            errors.nationalId ? errorBorder : normalBorder
                        }`}
                    />
                    {errors.nationalId && (
                        <span className="text-xs text-red-500">
                            {errors.nationalId}
                        </span>
                    )}
                </div>

                {/* تلفن */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="edit-phone"
                        className="text-sm font-medium"
                    >
                        شماره تلفن
                    </label>
                    <input
                        id="edit-phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        value={form.phone}
                        onChange={(e) =>
                            update("phone", e.target.value.replace(/\D/g, ""))
                        }
                        dir="ltr"
                        className={`text-right text-night-700/50 dark:text-cream-50/50 ${baseInput} ${
                            errors.phone ? errorBorder : normalBorder
                        }`}
                    />
                    {errors.phone && (
                        <span className="text-xs text-red-500">
                            {errors.phone}
                        </span>
                    )}
                </div>

                {/* ایمیل */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="edit-email"
                        className="text-sm font-medium"
                    >
                        ایمیل{" "}
                        <span className="text-xs text-night-700/50 dark:text-cream-50/50">
                            (اختیاری)
                        </span>
                    </label>
                    <input
                        id="edit-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        dir="ltr"
                        className={`text-right text-night-700/50 dark:text-cream-50/50 ${baseInput} ${
                            errors.email ? errorBorder : normalBorder
                        }`}
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500">
                            {errors.email}
                        </span>
                    )}
                </div>

                {/* دکمه‌ها */}
                <div className="mt-2 flex flex-col-reverse xs:flex-row xs:justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="w-full xs:w-auto px-5 py-2.5 rounded-lg border border-night-700/10 dark:border-cream-50/10 text-night-700 dark:text-cream-50 hover:bg-night-700/5 dark:hover:bg-cream-50/5 disabled:opacity-50 transition-all duration-300"
                    >
                        انصراف
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isPending}
                        className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-600/60 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isPending ? (
                            <>
                                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                در حال ذخیره...
                            </>
                        ) : (
                            <>
                                <FaSave className="text-xs" />
                                ذخیره تغییرات
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
