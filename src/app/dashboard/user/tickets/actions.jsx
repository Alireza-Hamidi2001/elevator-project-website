// app/dashboard/user/tickets/actions.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitTicketAction(prevState, formData) {
    const category = formData.get("category")?.toString().trim() || "technical";
    const message = formData.get("message")?.toString().trim();

    const errors = {};
    if (!category) errors.category = "انتخاب موضوع الزامی است.";
    if (!message || message.length < 10)
        errors.message = "متن پیام باید حداقل ۱۰ کاراکتر باشد.";

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            errors,
            message: "لطفاً خطاهای فرم را برطرف کنید.",
            ts: Date.now(),
        };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user)
        return {
            ok: false,
            errors: {},
            message: "دسترسی غیرمجاز.",
            ts: Date.now(),
        };

    // ۱. ساخت تیکت (subject و category هر دو با هم)
    const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
            user_id: user.id,
            subject: category, // اینجا هم subject رو با همون مقدار پر می‌کنیم (یا می‌تونی متن فارسی بذاری)
            category: category, // برای فیلتر
        })
        .select()
        .single();

    if (ticketError) {
        console.error("TICKET INSERT ERROR >>>", ticketError);
        return {
            ok: false,
            errors: {},
            message: "خطا در ثبت تیکت.",
            ts: Date.now(),
        };
    }

    // ۲. ثبت اولین پیام
    const { error: messageError } = await supabase
        .from("ticket_messages")
        .insert({
            ticket_id: ticket.id,
            sender_id: user.id,
            body: message,
        });

    if (messageError) {
        console.error("MESSAGE INSERT ERROR >>>", messageError);
        await supabase.from("tickets").delete().eq("id", ticket.id);
        return {
            ok: false,
            errors: {},
            message: "خطا در ثبت متن پیام.",
            ts: Date.now(),
        };
    }

    revalidatePath("/dashboard/admin/ticketInbox");
    revalidatePath("/dashboard", "layout");

    return {
        ok: true,
        errors: {},
        message: "تیکت شما با موفقیت ثبت شد.",
        ts: Date.now(),
    };
}
