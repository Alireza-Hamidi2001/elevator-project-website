// app/components/PersianNumber.jsx
const toPersianDigits = (str) =>
    String(str ?? "").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export default function PersianNumber({
    value,
    className = "",
    as = "span",
    ...rest
}) {
    const Tag = as;
    return (
        <Tag
            className={className}
            {...rest}
        >
            {toPersianDigits(value)}
        </Tag>
    );
}

// خروجی تابع هم برای جاهایی که فقط تابع می‌خوای
export { toPersianDigits };
