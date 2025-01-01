import React, { useState } from "react";
import axios from "axios";
import { IoDocumentText } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdImportContacts } from "react-icons/md";
import { MdSms } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import FieldSelector from "./Generate/fieldSelector.jsx";
import FieldsForm from "./Generate/fieldsForm.jsx";
import QrCodeDisplay from "./Generate/QrCodeDisplay.jsx";
import { isAuth } from "../utils/helper.js";

// Helper function to get a cookie by name
const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const cookiePair = cookie.split("=");
    if (name === cookiePair[0]) {
      return cookiePair[1]; // Return the value of the cookie
    }
  }
  return null; // Return null if not found
};

export default function Generate() {
  const { email } = isAuth();
  const [inputData, setInputData] = useState({
    text: "",
    url: "",
    email: "",
    E_message: "",
    prefix: "",
    fname: "",
    lname: "",
    organization: "",
    country: "",
    region: "",
    Description: "",
    phone: "",
    phoneNumber: "",
    Message: "",
  });
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [selectedField, setSelectedField] = useState("text");
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    setInputData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleclick = (field) => {
    setSelectedField(field);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCodeImage; // Use the QR code image data URL
    link.download = `Qr-kundali${Date.now()}.png`; // File name for the download
    link.click(); // Programmatically trigger the download
    toast.success("Qr code was successfully downloaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1. Retrieve the token from localStorage
    const token = getCookie("token");
    if (!token) {
      toast.error("You are not authenticated, Please log in again.");
      return;
    }

    // Define fields based on selectedField
    const fieldMap = {
      text: ["text"],
      url: ["url"],
      email: ["email", "E_message", "Description"],
      contact: [
        "prefix",
        "fname",
        "lname",
        "organization",
        "country",
        "region",
      ],
      sms: ["phoneNumber", "Message"],
      phone: ["phone"],
    };
    // console.log(fieldMap);

    // Extract only the fields related to the selectedField
    const requestData = Object.fromEntries(
      fieldMap[selectedField]?.map((key) => [key, inputData[key]]) || []
    );
    // console.log(requestData);

    try {
      setLoading(true); // Start loader
      const response = await axios.post(
        "/api/v1/generate-qr",
        {
          qrCodeText: requestData,
          email,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`, //Send th token with Bearer schema
          },
        }
      );
      setTimeout(() => {
        setQrCodeImage(response.data.qrCodeImage); // base64 data
        setLoading(false); // Stop loader
        toast.success("QR code generated successfully!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! please log in again.");
      } else {
        console.error("QR Code generation failed", error);
      }
    }
  };

  // Define the fields with their associated icons and labels
  const fields = [
    {
      key: "text",
      label: "Text",
      icon: <IoDocumentText size={25} className="ml-2" />,
    },
    {
      key: "email",
      label: "Email",
      icon: <MdEmail className="ml-2" size={25} />,
    },
    { key: "url", label: "URL", icon: <IoMdLink size={25} /> },
    {
      key: "contact",
      label: "Contact",
      icon: <MdImportContacts className="ml-4" size={25} />,
    },
    { key: "sms", label: "sms", icon: <MdSms size={25} /> },
    { key: "phone", label: "Phone", icon: <FaPhoneAlt size={22} /> },
  ];

  return (
    <>
      <FieldSelector
        fields={fields}
        selectedField={selectedField}
        handleclick={handleclick}
      />
      <div className="sm:flex sm:justify-between">
        <div>
          <FieldsForm
            selectedField={selectedField}
            inputData={inputData}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className=" p-2 px-4 items-center my-2 mx-14 bg-blue-500 rounded text-white"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center sm:mb-72 mb-7">
            <div className="spinner border-t-4 border-blue-500 w-20 h-20 rounded-full animate-spin"></div>
          </div>
        ) : (
          <QrCodeDisplay
            qrCodeImage={qrCodeImage}
            handleDownload={handleDownload}
          />
        )}
      </div>
    </>
  );
}
