import QRCode from "qrcode";
import Scan from "../models/scanModel.js";
import SignUpModel from "../models/signupSchema.js";
import Generate from "../models/generateModel.js";

// Controller for Generate QR code
export const GenerateQr = async (req, res) => {
  const { qrCodeText, email } = req.body;
  const {
    text,
    url,
    E_message,
    Description,
    prefix,
    fname,
    lname,
    organization,
    country,
    region,
    phone,
    Message,
    phoneNumber,
  } = qrCodeText || {};

  // Create an object with all fields
  const fields = {
    Text: text,
    URL: url,
    Prefix: prefix,
    "First Name": fname,
    "Last Name": lname,
    Organization: organization,
    Country: country,
    Region: region,
    Phone: phone,
    "Phone Number": phoneNumber,
    Message: Message,
    "E-Message": E_message,
    Description: Description,
  };
  // Add the Email from qrCodeText if it's available
  if (qrCodeText?.email) {
    fields.Email = qrCodeText.email;
  }
  // Filter out empty fields
  const filteredData = Object.entries(fields)
    .filter(([key, value]) => value) // Only include fields with non-empty values
    .map(([key, value]) => `${key}: ${value}`) // Format the remaining fields
    .join(", "); // Join them as a single string
  // console.log("Filtered Data:", filteredData);

  if (!filteredData || filteredData.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field must have data" });
  }

  try {
    // Generate QR code as base64 data
    const qrCodeDataURL = await QRCode.toDataURL(filteredData, {
      width: 250,
      pixelRatio: 7,
    });

    let generate = await Generate.findOne({ email });
    if (generate) {
      // Add new QR code to the existing array
      generate.GeneratedActivities.push({
        qrCodeText: filteredData,
        qrCodeImage: qrCodeDataURL,
      });
      await generate.save();
    } else {
      // Create new document
      generate = await Generate.create({
        email,
        GeneratedActivities: [
          { qrCodeText: filteredData, qrCodeImage: qrCodeDataURL },
        ],
      });
    }
    res.status(200).json({
      message: "QR code generated Successfully",
      qrCodeImage: qrCodeDataURL,
      data: generate,
    });
  } catch (error) {
    console.error("Error generating and saving QR code:", error);
    res.status(500).json({ message: "QR Code generation failed", error });
  }
};

///Controller for Scanqr code
export const ScanQr = async (req, res) => {
  try {
    const { qrCodeText, email } = req.body;
    // Save activity in the Scan model
    let scan = await Scan.findOne({ email });
    if (scan) {
      // User exists, merge the new activity into the existing array
      scan.activities.push({ qrCodeText });
      await scan.save();
    } else {
      scan = await Scan.create({
        email,
        activities: [{ qrCodeText }],
      });
    }
    res.status(201).json({
      message: "Scan saved successfully!",
      data: scan,
    });
  } catch (error) {
    console.error("Error saving scan data:", error);
    res.status(500).json({ message: "Error saving scan data", error });
  }
};
