import mongoose,{models, Schema} from "mongoose";

export interface topper {
    studentname:string,
    position:string,
    description:string;
    image:string
}

const topperSchema=new Schema<topper>({
     studentname:{
        type:String,
        required:true
     },
     position:{
        type:String,
        required:true
     },
    description:{
        type:String,
        required:true
     },
     image:{
        type:String,
        required:true
     },
    },{timestamps:true})

    const toppermodel=models?.topper||mongoose.model("topper",topperSchema);
export default toppermodel;