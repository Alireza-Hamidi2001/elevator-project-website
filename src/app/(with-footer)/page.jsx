import Hero from "../components/Hero";
import AboutSection from "./_about/page";
import ContactSection from "./_contact/page";
import ServicesSection from "./_services/page";

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
