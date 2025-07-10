import mongoose,{models, Schema} from "mongoose";

export interface alumni {
    studentname:string,
    post:string
    description:string;
    image:string
}

const alumniSchema=new Schema<alumni>({
     studentname:{
        type:String,
        required:true
     },
     post:{
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

    const alumnimodel=models?.alumni||mongoose.model("alumni",alumniSchema);
export default alumnimodel;