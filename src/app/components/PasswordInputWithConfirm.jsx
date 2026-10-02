"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInputWithConfirm({
    password,
    confirmPassword,
    onPasswordChange,
    onConfirmChange,
    errors = {},
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // چک زنده تطابق — فقط وقتی کاربر چیزی تایپ کرده
    const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const baseInput =
        "w-full border rounded-md px-3 py-2 pl-10 outline-none focus:ring-2 transition-all duration-300";
    const normalBorder =
        "border-night-700/10 dark:border-cream-50/10 focus:ring-blue-500";
    const errorBorder = "border-red-500 focus:ring-red-500";

    return (
        <div className="flex flex-col gap-4">
            {/* رمز عبور */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium"
                >
                    رمز عبور
                </label>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        placeholder="حداقل ۸ کاراکتر"
                        className={`${baseInput} ${
                            errors.password ? errorBorder : normalBorder
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "پنهان کردن" : "نمایش رمز"}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-night-700/50 dark:text-cream-50/50 hover:text-night-700 dark:hover:text-cream-50 transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && (
                    <span className="text-xs text-red-500">
                        {errors.password}
                    </span>
                )}
            </div>

            {/* تکرار رمز عبور */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                >
                    تکرار رمز عبور
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => onConfirmChange(e.target.value)}
                        placeholder="رمز عبور را دوباره وارد کنید"
                        className={`${baseInput} ${
                            errors.confirmPassword || mismatch
                                ? errorBorder
                                : normalBorder
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        aria-label={showConfirm ? "پنهان کردن" : "نمایش رمز"}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-night-700/50 dark:text-cream-50/50 hover:text-night-700 dark:hover:text-cream-50 transition-colors"
                    >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <span className="text-xs text-red-500">
                        {errors.confirmPassword}
                    </span>
                )}
                {!errors.confirmPassword && mismatch && (
                    <span className="text-xs text-red-500">
                        رمز عبور و تکرار آن یکسان نیستند
                    </span>
                )}
                {!errors.confirmPassword &&
                    !mismatch &&
                    confirmPassword.length > 0 && (
                        <span className="text-xs text-green-600 dark:text-green-400">
                            ✓ رمز عبور مطابقت دارد
                        </span>
                    )}
            </div>
        </div>
    );
}
