import { HiOutlineHandRaised } from "react-icons/hi2";
import { MdWavingHand } from "react-icons/md";

// app/components/WavingHand.jsx
export default function WavingHand({ className = "w-8 h-8" }) {
    return (
        <div
            className={`inline-block ${className}`}
            aria-hidden="true"
        >
            <HiOutlineHandRaised className="w-full h-full text-night-700 dark:text-cream-50 animate-[wave_2s_infinite] origin-[70%_80%]" />
        </div>
    );
}
