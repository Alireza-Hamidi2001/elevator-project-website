// lib/auth.js
import "server-only";
import { createClient } from "@/lib/supabase/server";

export const toAuthEmail = (phone) => `${phone}@users.example.com`;

// داخل هر Server Action ادمین‌محور صدا بزن؛ middleware به‌تنهایی کافی نیست
export async function requireAdmin() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: p } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

    return p?.role === "admin" && p.is_active ? user : null;
}
