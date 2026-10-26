import { Suspense } from "react";
import TicketList from "./TicketList";
import TicketFilter from "./TicketFilter";
import { almarai } from "@/app/_fonts/fonts";
import { Fallback } from "@/app/components/Fallback";

export const metadata = { title: "صندوق دریافت" };

export default async function AdminTicketInboxPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const pageKey = `${resolvedParams?.status || "all"}-${
        resolvedParams?.page || "1"
    }`;

    return (
        <div className="py-6 px-4 sm:px-6 bg-white dark:bg-night-900 shadow-sm overflow-auto h-[calc(100vh-4rem)]">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1
                        className={`${almarai.className} text-xl sm:text-2xl font-bold text-night-900 dark:text-cream-50`}
                    >
                        صندوق دریافت
                    </h1>
                    <p className="mt-1 text-sm text-night-700/60 dark:text-cream-50/60">
                        تیکت‌های دریافتی از کاربران. با پاسخ دادن، تیکت به صورت
                        خودکار بسته می‌شود.
                    </p>
                </div>

                <TicketFilter />

                <Suspense
                    key={pageKey}
                    fallback={<Fallback message="در حال دریافت تیکت‌ها" />}
                >
                    <TicketList searchParams={resolvedParams} />
                </Suspense>
            </div>
        </div>
    );
}
