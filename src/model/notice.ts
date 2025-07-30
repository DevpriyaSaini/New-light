import mongoose,{models, Schema} from "mongoose";

export interface Notice {
    notice:string,
    Adminname:string
}

const NoticeSchema=new Schema<Notice>({
     notice:{
        type:String,
        required:true
     },
     Adminname:{
        type:String,
        required:true
     },
    
    },{timestamps:true})

    const noticemodel=models?.notice||mongoose.model("notice",NoticeSchema);
export default noticemodel;