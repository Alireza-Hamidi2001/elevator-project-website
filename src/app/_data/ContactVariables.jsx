import {
    FaPhoneAlt,
    FaTelegramPlane,
    FaEnvelope,
    FaMapMarkerAlt,
    FaMobileAlt,
} from "react-icons/fa";

export const contactInfo = [
        {
            id: "mobile",
            icon: <FaMobileAlt className="w-20 h-20" />,
            title: "تلفن همراه",
            values: ["0915-324-1950", "0904-324-1950"],
            href: "tel:09153241950",
        },
        {
            id: "telegram",
            icon: <FaTelegramPlane className="w-20 h-20" />,
            title: "تلگرام",
            values: ["@elevator_support"],
            href: "https://t.me/elevator_support",
        },
        {
            id: "email",
            icon: <FaEnvelope className="w-20 h-20" />,
            title: "ایمیل",
            values: ["info@elevator-platform.ir"],
            href: "mailto:info@elevator-platform.ir",
        },
    ];
