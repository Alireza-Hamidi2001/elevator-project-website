import { FaUser } from "react-icons/fa";

function page() {
    return (
        <div className="">
            <div className="flex justify-between gap-4 px-8 py-4 shadow-sm bg-white dark:bg-night-900">
                <div className="flex items-center gap-4">
                    <div className="bg-cream-200 dark:bg-night-700 w-12 h-12 rounded-full flex items-center justify-center">
                        <FaUser className="text-night-700 dark:text-cream-50 w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-night-700 dark:text-cream-50">
                            نام و نام خانوادگی
                        </p>
                        <p className="text-night-700/50 dark:text-cream-50/50">
                            سمت
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <p>
                        شماره تلفن:{" "}
                        <span className="text-night-700/50 dark:text-cream-50/50">
                            09151234567
                        </span>
                    </p>
                    <p>
                        کد ملی:{" "}
                        <span className="text-night-700/50 dark:text-cream-50/50">
                            0925555555
                        </span>
                    </p>
                    <p>
                        ایمیل:{" "}
                        <span className="text-night-700/50 dark:text-cream-50/50">
                            alireza@gmail.com
                        </span>
                    </p>
                    <p>
                        آدرس:{" "}
                        <span className="text-night-700/50 dark:text-cream-50/50">
                            مشهد - بلوار شاهد
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default page;
