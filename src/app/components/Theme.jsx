"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@wrksz/themes/client";
import { FaRegMoon } from "react-icons/fa";
import { LuSunDim } from "react-icons/lu";

function Theme() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-7 h-7" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "روشن کردن تم" : "تاریک کردن تم"}
            className="cursor-pointer"
        >
            {isDark ? (
                <LuSunDim className="w-5 h-5" />
            ) : (
                <FaRegMoon className="w-5 h-5" />
            )}
        </button>
    );
}

export default Theme;
