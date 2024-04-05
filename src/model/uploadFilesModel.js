import mongoose from "mongoose";

const uploadFileSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        fileKey: {
            type: String,
            require: true,
        },
        location: {
            type: String,
            require: true,
        },
        createdby: {
            type: String,
            default: null,
        },
        updatedby: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("uploadFile", uploadFileSchema);
