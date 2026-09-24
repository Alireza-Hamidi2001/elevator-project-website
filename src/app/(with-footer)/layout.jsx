import Footer from "../components/Footer";

export default function WithFooterLayout({ children }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
