import mongoose,{models, Schema} from "mongoose";

export interface result {
    studentname:string,
    studentId:string,
    class:string,
    position:string,
    description:string;
    image:string
}

const resultSchema=new Schema<result>({
     studentname:{
        type:String,
        required:true
     },
     studentId:{
        type:String,
        required:true
     },
     position:{
        type:String,
        required:true
     },
     class:{
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

    const resultmodel=models?.result||mongoose.model("result",resultSchema);
export default resultmodel;