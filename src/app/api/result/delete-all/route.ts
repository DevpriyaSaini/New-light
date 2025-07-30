import mongoose from "mongoose";
import resultmodel from "@/model/result";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const res=await resultmodel.deleteMany();
        return NextResponse.json({
            msg:"all result delete sucessfully"
        },{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            error:"error from internal service"
        },{status:500})
    }
    
}