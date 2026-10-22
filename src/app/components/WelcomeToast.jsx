// app/components/WelcomeToast.jsx
"use client";

import { useEffect } from "react";
import { toast } from "@/app/components/toast";
import { clearWelcomeCookie } from "@/app/dashboard/actions";

export default function WelcomeToast({ show }) {
    useEffect(() => {
        if (!show) return;

        toast.success("ورود موفقیت آمیز بود . خوش آمدید.");
        clearWelcomeCookie();
    }, [show]);

    return null;
}
