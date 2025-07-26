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
     button:{
        type:String,
        default:"Explore more"
     }
    },{timestamps:true})

    const headlinemodel=models?.headline||mongoose.model("headline",headlineSchema);
export default headlinemodel;