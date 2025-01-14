import mongoose from "mongoose";

const generateSchema = new mongoose.Schema({
  email: { type: String, required: true },
  GeneratedActivities: [
    {
      qrCodeText: { type: String, required: true },
      qrCodeImage: { type: String, required: true }, 
      createdAt: { type: Date, default: Date.now }, 
    },
  ],
});

const Generate = mongoose.model("Generate", generateSchema);
export default Generate;
