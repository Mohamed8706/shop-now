import { useEffect, useState } from "react";
import axios from "axios";
import { GOOGLE_CALL_BACK, baseUrl } from "../../../Services/Api";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function GoogleCallBack() {
  const location = useLocation();
  const navigate = useNavigate();
  const cookie = Cookie();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
        const token = res.data.access_token;
        cookie.set("e-commerce", token); // Fixed space in cookie name
        setStatus("success");
      } catch (err) {
        console.error("Google callback error:", err);
        setStatus("error");
      }
    }
    GoogleCall();
  }, [location.search]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600">Processing your Google login...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-5xl"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Login Successful!
            </h1>
            <p className="text-gray-600">
              You’ve successfully logged in with Google. Welcome back!
            </p>
            <button
              onClick={handleBackToHome}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon
              icon={faCheckCircle} // Could replace with faExclamationCircle
              className="text-red-500 text-5xl"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Oops, Something Went Wrong
            </h1>
            <p className="text-gray-600">
              There was an issue with your Google login. Please try again.
            </p>
            <button
              onClick={handleBackToHome}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}