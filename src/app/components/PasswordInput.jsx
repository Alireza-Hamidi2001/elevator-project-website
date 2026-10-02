"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

function PasswordInput() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    function eyeHandler() {
        setIsShowPassword((prev) => !prev);
    }
    return (
        <div className="relative flex flex-col justify-center gap-2">
            <label
                htmlFor="password"
                className="text-sm font-medium"
            >
                رمز عبور
            </label>
            <input
                type={isShowPassword ? "text" : "password"}
                id="password"
                placeholder="رمز عبور خود را وارد کنید"
                className="border border-night-700/10 dark:border-cream-50/10 mb-4 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {isShowPassword ? (
                <LuEyeClosed
                    onClick={eyeHandler}
                    className="absolute left-2 top-[45%] w-5 h-5 text-night-700/50 dark:text-cream-50/50"
                />
            ) : (
                <LuEye
                    onClick={eyeHandler}
                    className="absolute left-2 top-[45%] w-5 h-5 text-night-700/50 dark:text-cream-50/50"
                />
            )}
        </div>
    );
}

export default PasswordInput;
