// app/dashboard/actions.jsx
"use server";
import { cookies } from "next/headers";

export async function clearWelcomeCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("welcome_toast");
}
