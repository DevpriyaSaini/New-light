import mongoose,{models, Schema} from "mongoose";

export interface Fest {
    title:string,
    description:string;
    image:string
    ftype:string
}

const FestSchema=new Schema<Fest>({
     title:{
        type:String,
        required:true
     },
     
    description:{
        type:String,
        required:true
     },
     ftype:{
        type:String,
        required:true
     },
     image:{
        type:String,
        required:true
     },
    },{timestamps:true})

    const festmodel=models?.fest||mongoose.model("fest",FestSchema);
export default festmodel;