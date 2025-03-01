import React from "react";
import { baseUrl } from "../../../Services/Api";
import  GoogleIcon from "../../../Assets/icons8-google.svg";

export function Google() {
    return <div className="google-wraper">
                    <a href={`${baseUrl}/login-google`}>
                    <img src={GoogleIcon} alt="google-ico" className="google-icon"/>
                    <p className="par">Continue with Google</p>
                    </a>
                </div>;
}
