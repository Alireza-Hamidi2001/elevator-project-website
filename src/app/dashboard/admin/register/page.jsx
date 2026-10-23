import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "ثبت‌نام",
    description: "ایجاد حساب کاربری جدید در درخشان آبادیس آسانبر",
};

export default function page() {
    return (
        <div className="overflow-auto py-6 px-6 text-night-700 dark:text-cream-50 h-[calc(100vh-4rem)] bg-white dark:bg-night-900 shadow-sm">
            <div className="w-full mx-auto max-w-lg rounded-lg overflow-hidden  text-night-700 dark:text-cream-50">
                <RegisterForm />
            </div>
        </div>
    );
}
