// app/dashboard/ticket/page.jsx

import TicketForm from "@/app/components/TicketForm";

export default function TicketPage() {
    return (
        <div className="text-night-700 dark:text-cream-50 bg-white dark:bg-night-900 shadow-sm p-4">
            <h1 className="text-lg font-bold mb-4">ارسال تیکت</h1>
            <TicketForm />
        </div>
    );
}
