import Image from "next/image";
import heroImage from "@/app/public/hero-mobile.png";
import PasswordInput from "../components/PasswordInput";

function page() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="grid grid-cols-1 w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[30vw] md:h-[60vh] rounded-lg overflow-hidden shadow-lg">
                <form className="flex flex-col justify-center gap-2 p-6 md:p-8 bg-white dark:bg-night-800 text-night-700 dark:text-cream-50 order-1 md:order-2">
                    <div className="flex flex-col  justify-center gap-2">
                        <label
                            htmlFor="username"
                            className="text-sm font-medium"
                        >
                            نام کاربری
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="نام کاربری خود را وارد کنید"
                            className="border border-night-700/10 dark:border-cream-50/10 mb-3 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                    </div>
                    <PasswordInput />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition"
                    >
                        ورود
                    </button>
                </form>
            </div>
        </div>
    );
}

export default page;
