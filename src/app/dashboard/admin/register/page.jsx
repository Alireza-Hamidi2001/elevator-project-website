import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "ثبت‌نام",
    description: "ایجاد حساب کاربری جدید در درخشان آبادیس آسانبر",
};

export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4  shadow-lg bg-white dark:bg-night-800">
            <div className="w-full max-w-lg rounded-lg overflow-hidden  text-night-700 dark:text-cream-50">
                <RegisterForm />
            </div>
        </div>
    );
}
