import mongoose from "mongoose";
import toppermodel from "@/model/topper";
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


        const {studentname,position,description,image}=await request.json();

        if(!studentname||!position||!description||!image){
             return NextResponse.json({
            success:false,
            message:"All foeld is required"
        },{status:400})
        }
        const topper= await toppermodel.create({
            studentname,
            position,
            description,
            image
        })
        console.log(topper);
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
        const topper=await toppermodel.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(topper, { status: 200 });
    } catch (error) {
         console.log(error);
    return NextResponse.json(
      { error: "failed to fetch toppers"},
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
   await toppermodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "Topper deleted successfully",
      },
      { status: 200 }
    );
   } catch (error) {
    console.error("Error deleting Topper:", error);
    return NextResponse.json(
      { error: "Failed to delete Topper" },
      { status: 500 }
    )
   }

}

