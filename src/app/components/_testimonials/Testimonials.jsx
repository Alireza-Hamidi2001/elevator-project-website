// app/components/Testimonials.jsx
import { Suspense } from "react";
import TestimonialsList from "./TestimonialsList";
import { almarai } from "@/app/_fonts/fonts";

function TestimonialsSkeleton() {
    return (
        <div className="flex gap-5 animate-pulse mt-8 sm:mt-10">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex-1 h-48 rounded-2xl bg-cream-100 dark:bg-night-800"
                />
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section>
            <Suspense fallback={<TestimonialsSkeleton />}>
                <TestimonialsList />
            </Suspense>
        </section>
    );
}
