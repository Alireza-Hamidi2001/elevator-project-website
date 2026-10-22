import { almarai, estedad } from "../_fonts/fonts";

function Address() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <iframe
                src="https://www.openstreetmap.org/export/embed?bbox=59.59693282842637%2C36.29773596159006%2C59.59992617368699%2C36.299024342535525&amp;layer=mapnik"
                className="mx-auto rounded-2xl w-full h-[20rem]"
            ></iframe>
            <p className={`${almarai.className} text-3xl`}>
                آدرس دفتر مرکزی:
                <br />
                <span className={`${estedad.className} text-lg`}>
                    خراسان رضوی، مشهد، خیابان صاحب الزمان، صاحب الزمان 15، پاساژ
                    سرمد، شرکت درخشان آبادیس آسانبر
                </span>
            </p>
            <small>
                <a href="https://www.openstreetmap.org/#map=19/36.298380/59.598430">
                    نمایش کامل نقشه
                </a>
            </small>
        </div>
    );
}

export default Address;
