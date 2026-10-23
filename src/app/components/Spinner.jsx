import { Oval } from "react-loader-spinner";

export function Spinner() {
    return (
        <Oval
            visible={true}
            height="40"
            width="40"
            color="#964646"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
}
