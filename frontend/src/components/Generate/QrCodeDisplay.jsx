import React from "react";

export default function QrCodeDisplay({ qrCodeImage, handleDownload }) {
  return (
    <>
      <div className="sm:mt-[-145px]">
        {qrCodeImage && (
          <div className="flex flex-col w-[200px] justify-center items-center ml-20 mb-4  sm:mt-20 sm:mr-52">
            <span className="">Your QR code</span>
            <img src={qrCodeImage} alt="Generated QR Code" />
            <button
              className=" bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
}
