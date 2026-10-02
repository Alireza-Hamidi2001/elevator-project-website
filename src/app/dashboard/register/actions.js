"use server";

export async function registerAction(prevState, formData) {
    // استخراج داده‌ها
    const data = {
        firstName: formData.get("firstName")?.toString().trim() || "",
        lastName: formData.get("lastName")?.toString().trim() || "",
        gender: formData.get("gender")?.toString() || "",
        nationalId: formData.get("nationalId")?.toString().trim() || "",
        phone: formData.get("phone")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        password: formData.get("password")?.toString() || "",
        confirmPassword: formData.get("confirmPassword")?.toString() || "",
    };

    const errors = {};

    // اعتبارسنجی سمت سرور (منبع حقیقت)
    if (!data.firstName) errors.firstName = "نام الزامی است";
    if (!data.lastName) errors.lastName = "نام خانوادگی الزامی است";
    if (!data.gender) errors.gender = "جنسیت را انتخاب کنید";

    if (!/^\d{10}$/.test(data.nationalId)) {
        errors.nationalId = "کد ملی باید ۱۰ رقم باشد";
    }

    if (!/^09\d{9}$/.test(data.phone)) {
        errors.phone = "شماره تلفن معتبر نیست";
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "ایمیل معتبر نیست";
    }

    if (data.password.length < 8) {
        errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";
    }

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            errors,
            message: "لطفاً خطاهای فرم را برطرف کنید",
        };
    }

    try {
        // اینجا به دیتابیس وصل شو (Prisma, Drizzle, ...)
        // const user = await prisma.user.create({ data: {...} });

        // شبیه‌سازی تأخیر شبکه
        await new Promise((r) => setTimeout(r, 1500));

        return {
            ok: true,
            errors: {},
            message: "ثبت‌نام با موفقیت انجام شد",
        };
    } catch (err) {
        return {
            ok: false,
            errors: {},
            message: "خطا در ارتباط با سرور. دوباره تلاش کنید",
        };
    }
}
