import {
  FaEnvelope,
  FaInstagram,
  FaMobileAlt,
  FaPhoneAlt,
  FaTelegramPlane
} from "react-icons/fa";
export const contactItems = [
        {
            id: "telegram",
            label: "تلگرام",
            value: "@elevator_support",
            href: "https://t.me/elevator_support",
            icon: <FaTelegramPlane />,
        },
        {
            id: "instagram",
            label: "اینستاگرام",
            value: "@elevator_ir",
            href: "https://instagram.com/elevator_ir",
            icon: <FaInstagram />,
        },
        {
            id: "email",
            label: "ایمیل",
            value: "info@elevator.ir",
            href: "mailto:info@elevator.ir",
            icon: <FaEnvelope />,
        },
        {
            id: "mobile",
            label: "تلفن همراه",
            value: "۰۹۱۵ ۱۲۳ ۴۵۶۷",
            href: "tel:+989151234567",
            icon: <FaMobileAlt />,
        },
        {
            id: "phone",
            label: "تلفن ثابت",
            value: "۰۵۱ ۳۸۴۷ ۲۲۱۰",
            href: "tel:+985138472210",
            icon: <FaPhoneAlt />,
        },
    ];
