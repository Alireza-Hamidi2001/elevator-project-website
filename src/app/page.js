import AboutSection from "./(with-footer)/about/page";
import ContactSection from "./(with-footer)/contact/page";
import ServicesSection from "./(with-footer)/services/page";
import Hero from "./components/Hero";

function page() {
    return (
        <section>
            <Hero />
            <AboutSection />
            <ContactSection />
            <ServicesSection />
        </section>
    );
}

export default page;
