import SpinnerMini from "./SpinnerMini";

export function Fallback({ message }) {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-[10rem] text-night-700 dark:text-cream-50 rounded-xl border border-cream-200 dark:border-night-700 bg-cream-50 dark:bg-night-800 flex items-center gap-4 justify-center">
                <SpinnerMini />
                <span className="text-night-700 dark:text-cream-50">
                    {message}
                </span>
            </div>
        </div>
    );
}
