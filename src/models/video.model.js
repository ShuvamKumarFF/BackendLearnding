import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true,
        trim: true,
        index : true
    },
    videoFile: {
        type : String,
        required: true
    },
    thumnbnail : {
        type : String,
        required: true,
    },
    description:{
        type : String,
        required: true,
    },
    duration:{
        type: Number,
        required:true,
    },
    views: {
        type: Number,
        default:0,
    },
    isPublished:{
        type: Boolean,
        default : true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true})

videoSchema.plugin(mongooseAggregatepaginate)

 export const Video = mongoose.model("Video", videoSchema)