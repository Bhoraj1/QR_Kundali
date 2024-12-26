import mongoose from "mongoose";
const scanSchema = new mongoose.Schema(
  {
    email: {type:String, required:true},
    activities:[
      {
      qrCodeText: { type: String, required: true },
      ScanDate: { type: String, default: () => new Date().toISOString().slice(0, 19).replace('T', ' ')},
      }
    ],
  },
);

const Scan = mongoose.model("Scan", scanSchema);
export default Scan;
