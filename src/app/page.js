import AboutSection from "./(with-footer)/_about/page";
import ContactSection from "./(with-footer)/_contact/page";
import ServicesSection from "./(with-footer)/_services/page";
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
