import mongoose,{models, Schema} from "mongoose";

export interface teacher {
    teachername:string,
    education:string,
    experience:string,
    description:string;
    image:string
}

const teacherSchema=new Schema<teacher>({
     teachername:{
        type:String,
        required:true
     },
     education:{
        type:String,
        required:true
     },
    experience:{
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

    const teachermodel=models?.teacher||mongoose.model("teacher",teacherSchema);
export default teachermodel;