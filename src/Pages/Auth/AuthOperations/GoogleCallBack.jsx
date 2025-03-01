import { useEffect } from "react";
import axios from "axios";
import { GOOGLE_CALL_BACK, baseUrl } from "../../../Services/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
    const location = useLocation();
    const cookie = Cookie();

    useEffect(() => {
        async function GoogleCall() {
        try {
            const res = await axios
            .get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
            const token = res.data.access_token;
            cookie.set("e-commerce ", token);
        } catch (err) {
            console.log(err);
        }
        }
        GoogleCall();
    }, []);
    return <h1>test</h1>;
}
