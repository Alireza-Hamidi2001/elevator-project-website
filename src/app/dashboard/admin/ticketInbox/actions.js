// app/dashboard/admin/ticketInbox/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function replyToTicketAction(prevState, formData) {
    const ticketId = formData.get("ticketId")?.toString();
    const message = formData.get("message")?.toString().trim();

    if (!message || message.length < 2) {
        return {
            ok: false,
            message: "متن پاسخ بسیار کوتاه است.",
            ts: Date.now(),
        };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { ok: false, message: "دسترسی غیرمجاز.", ts: Date.now() };

    // ۱. ثبت پیام در جدول ticket_messages
    const { error: msgError } = await supabase.from("ticket_messages").insert({
        ticket_id: ticketId,
        sender_id: user.id,
        body: message,
    });

    if (msgError) {
        console.error("REPLY INSERT ERROR >>>", msgError);
        return { ok: false, message: "خطا در ثبت پاسخ.", ts: Date.now() };
    }

    // ۲. تغییر وضعیت تیکت به closed
    const { error: updateError } = await supabase
        .from("tickets")
        .update({ status: "closed" })
        .eq("id", ticketId);

    if (updateError) {
        console.error("STATUS UPDATE ERROR >>>", updateError);
        return {
            ok: false,
            message: "خطا در تغییر وضعیت تیکت.",
            ts: Date.now(),
        };
    }

    // ۳. آپدیت کش
    revalidatePath("/dashboard/admin/ticketInbox");
    revalidatePath("/dashboard", "layout");

    return {
        ok: true,
        message: "پاسخ با موفقیت ثبت و تیکت بسته شد.",
        ts: Date.now(),
    };
}
