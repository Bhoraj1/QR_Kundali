import mongoose from "mongoose";

const generateSchema = new mongoose.Schema({
  email: { type: String, required: true },
  GeneratedActivities: [
    {
      qrCodeText: { type: String, required: true }, // Data encoded in the QR code
      qrCodeImage: { type: String, required: true }, // Base64-encoded QR code image
      createdAt: { type: Date, default: Date.now }, // Timestamp
    },
  ],
});

const Generate = mongoose.model("Generate", generateSchema);
export default Generate;
