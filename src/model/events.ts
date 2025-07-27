import mongoose,{models, Schema} from "mongoose";
import { string } from "zod";

export interface headline {
    description:string;
    image:string
    button:string
}

const headlineSchema=new Schema<headline>({
     
    description:{
        type:String,
        required:true
     },
     image:{
        type:String,
        required:true
     },
    },{timestamps:true})

    const headlinemodel=models?.headline||mongoose.model("headline",headlineSchema);
export default headlinemodel;