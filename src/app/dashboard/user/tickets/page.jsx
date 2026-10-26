// app/dashboard/user/tickets/page.jsx
import TicketForm from "./TicketForm";

export const metadata = { title: "ارتباط با پشتیبانی" };

export default function UserTicketsPage() {
    return (
        <div className="p-6 text-night-700 dark:text-cream-50 min-h-[calc(100vh-4rem)] bg-white dark:bg-night-900 shadow-sm">
            <header className="mb-6">
                <h1 className="text-lg font-bold mb-1">ارتباط با پشتیبانی</h1>
                <p className="text-sm text-night-700/60 dark:text-cream-50/60">
                    شرکت درخشان آبادیس آسانبر
                </p>
            </header>
            <TicketForm />
        </div>
    );
}
