import React, { useRef, useState } from "react";
import QrScanner from "qr-scanner";
import axios from "axios";
import { isAuth } from "../utils/helper";
export default function Scan() {
  const [qrCodeText, setQrCodeText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);

  const saveScanData = async (qrCodeText) => {
    const { email } = isAuth();
    try {
      setLoading(true);
      // Send POST request to backend API
      const response = await axios.post(
        "/api/v1/save-scan",
        {
          qrCodeText,
          email,
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving scan data:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      QrScanner.scanImage(file)
        .then((result) => {
          setQrCodeText(result); // Set the scanned QR code text
          setError("");
          saveScanData(result); // Save the scanned QR code text to the backend API if successful
        })
        .catch((err) => {
          setQrCodeText(""); // Clear the result in case of error
          setError("Failed to scan QR code. Please try again.");
          console.error(err);
        });
    }
  };

  const handleCopyAndHighlight = () => {
    navigator.clipboard.writeText(qrCodeText);
    if (textRef.current) {
      textRef.current.select();
    }
  };

  return (
    <>
      <div className="flex flex-col sm:justify-center sm:items-center ml-7">
        <h1 className="text-4xl font-bold font-serif sm:m-2 m-3">
          QR Code Scanner (Upload Image)
        </h1>
        <div className="ml-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-2xl w-full max-w-md mb-2"
          />
        </div>

        {qrCodeText && (
          <div className="sm:mr-14 text-xl flex flex-col">
            <h2 className="mt-2 sm:flex sm:justify-center sm:items-center text-stone-700 font-bold text-2xl ">
              KUNDALI Results is:
            </h2>
            <div className="sm:w-[600px] relative">
              <textarea
                ref={textRef}
                className="sm:w-full w-[300px] h-40 p-2 border-2 border-gray-500 rounded-md  "
                value={loading ? "" : qrCodeText}
                onChange={(e) => setQrCodeText(e.target.value)} // Update qrCodeText when changed
              />
              {loading && (
                <div className="absolute inset-0 flex justify-center sm:items-center ">
                  <div className="mt-14 mr-7 sm:mt-0 spinner border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        )}
        {qrCodeText && (
          <div className="flex justify-center items-center mt-3 mr-12">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:border-2 border-blue-700 "
              onClick={handleCopyAndHighlight}
            >
              Copy Result
            </button>
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
}
