"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/app/components/toast";
import { logoutAction } from "@/app/login/actions";

export function useLogout() {
    const [pending, setPending] = useState(false);
    const router = useRouter();

    async function handleLogout(onSuccess) {
        setPending(true);
        const res = await logoutAction();
        setPending(false);

        if (res?.error) {
            toast.error(res.error);
            return;
        }

        if (onSuccess) onSuccess();

        toast.success("شما با موفقیت از حساب کاربری خود خارج شدید.");
        router.push("/login");
        router.refresh();
    }

    return { handleLogout, pending };
}
