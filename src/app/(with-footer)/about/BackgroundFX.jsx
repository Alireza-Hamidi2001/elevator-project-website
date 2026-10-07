export default function BackgroundFX() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            {/* گرادیان متحرک */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/40 via-transparent to-amber-200/40 dark:from-indigo-900/30 dark:to-amber-900/20 animate-gradient" />

            {/* حباب‌های معلق */}
            <span className="bubble bubble-1" />
            <span className="bubble bubble-2" />
            <span className="bubble bubble-3" />
            <span className="bubble bubble-4" />
            <span className="bubble bubble-5" />
            <span className="bubble bubble-6" />
            <span className="bubble bubble-7" />
            <span className="bubble bubble-8" />
            <span className="bubble bubble-9" />
            <span className="bubble bubble-10" />

            {/* نقطه‌های شناور */}
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
            <span className="dot dot-4" />
            <span className="dot dot-5" />
            <span className="dot dot-6" />
            <span className="dot dot-7" />
            <span className="dot dot-8" />
            <span className="dot dot-9" />
            <span className="dot dot-10" />
            <span className="dot dot-11" />
            <span className="dot dot-12" />

            {/* آیکون‌های تعمیرات و آسانسور */}
            {/* <span className="tool tool-wrench">
                <WrenchIcon />
            </span> */}
            {/* <span className="tool tool-screw">
                <ScrewIcon />
            </span> */}
            {/* <span className="tool tool-arrows">
                <ArrowsIcon />
            </span> */}
            <span className="tool tool-gear">
                <GearIcon />
            </span>
            <span className="tool tool-hammer">
                <HammerIcon />
            </span>
            <span className="tool tool-bell">
                <BellIcon />
            </span>
            <span className="tool tool-toolbox">
                <ToolboxIcon />
            </span>
            <span className="tool tool-door-1">
                <DoorIcon />
            </span>
            <span className="tool tool-door-2">
                <DoorIcon />
            </span>
            <span className="tool tool-door-3">
                <DoorIcon />
            </span>
            <span className="tool tool-ladder">
                <LadderIcon />
            </span>

            {/* موج‌ها */}
            <svg
                className="absolute bottom-0 left-0 w-[200%] h-40 animate-wave-slow opacity-25"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    className="text-indigo-400/50 dark:text-indigo-600/40"
                    d="M0,100 C240,160 480,40 720,100 C960,160 1200,40 1440,100 L1440,200 L0,200 Z"
                />
            </svg>
            <svg
                className="absolute bottom-0 left-0 w-[200%] h-32 animate-wave opacity-40"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    className="text-purple-300/60 dark:text-purple-700/40"
                    d="M0,120 C300,60 600,180 900,120 C1140,70 1320,140 1440,110 L1440,200 L0,200 Z"
                />
            </svg>
        </div>
    );
}

/* ===== آیکون‌های SVG ===== */

function WrenchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.1-2.1 2.4-2.2z" />
        </svg>
    );
}

function GearIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <circle
                cx="12"
                cy="12"
                r="3"
            />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

function ScrewIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M9 3h6l-1 5H10L9 3z" />
            <path d="M10 8h4l1 5h-6l1-5z" />
            <path d="M9 13h6l1 5H8l1-5z" />
            <path d="M12 18v3" />
        </svg>
    );
}

function HammerIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
            <path d="M17.6 6.4L15 9l-3-3 2.6-2.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8z" />
        </svg>
    );
}

function ArrowsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M8 3l-4 4 4 4" />
            <path d="M4 7h12a4 4 0 0 1 0 8h-4" />
            <path d="M16 21l4-4-4-4" />
            <path d="M20 17H8" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}

function ToolboxIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M2 7h20v13H2z" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M2 12h20" />
        </svg>
    );
}

function DoorIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M3 3h18v18H3z" />
            <path d="M12 3v18" />
            <circle
                cx="9"
                cy="12"
                r="0.5"
                fill="currentColor"
            />
            <circle
                cx="15"
                cy="12"
                r="0.5"
                fill="currentColor"
            />
        </svg>
    );
}

function LadderIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
        >
            <path d="M6 2v20" />
            <path d="M18 2v20" />
            <path d="M6 6h12" />
            <path d="M6 12h12" />
            <path d="M6 18h12" />
        </svg>
    );
}
