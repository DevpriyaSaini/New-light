import mongoose from "mongoose";
import teachermodel from "@/model/teacher";
import { Connectiondb } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextaauth]/option";


export async function POST(request:NextRequest) {
   
    
    try {
         const session= await getServerSession(authOptions);
       if(!session){
        console.log(("user is unaurthorized"));
        
        return NextResponse.json({
            error:"user is unaurthorized",
           
         }, {status:401});
    }

    await Connectiondb();


        const {teachername,education,degree,description,image}=await request.json();

        if(!teachername||!education||!degree||!description||!image){
             return NextResponse.json({
            success:false,
            message:"All foeld is required"
        },{status:400})
        }
        const teacher= await teachermodel.create({
            teachername,
            education,
            degree,
            description,
            image
        })
        console.log(teacher);
        return NextResponse.json({
            success:true,
            message:"topper model upload successfully"
        },{status:200})
        
        


    } catch (error) {
         console.log("error");
        
        return NextResponse.json({
            error:"error to upload vtoppermodel",
           
         }, {status:500});
    }
}

export async function GET() {
    try {
        await Connectiondb();
        const teacher=await teachermodel.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(teacher, { status: 200 });
    } catch (error) {
         console.log(error);
    return NextResponse.json(
      { error: "failed to fetch teacher"},
      { status: 500 }
    );
  }
          
}

export async function DELETE(request: NextRequest) {
   try {
     const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "User is unauthorized" },
        { status: 401 }
      );
    }

    await Connectiondb();

     const { id } = await request.json();
   await teachermodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "Teacher deleted successfully",
      },
      { status: 200 }
    );
   } catch (error) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      { error: "Failed to delete teacher" },
      { status: 500 }
    )
   }

}