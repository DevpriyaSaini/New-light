import mongoose from "mongoose";
import alumnimodel from "@/model/alumni";
import { Connectiondb } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

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


        const {studentname,post,description,image}=await request.json();

        if(!studentname||!post||!description||!image){
             return NextResponse.json({
            success:false,
            message:"All field is required"
        },{status:400})
        }
        const alumni= await alumnimodel.create({
            studentname,
            post,
            description,
            image
        })
        console.log(alumni);
        return NextResponse.json({
            success:true,
            message:"alumni model upload successfully"
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
        const alumni=await alumnimodel.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(alumni, { status: 200 });
    } catch (error) {
         console.log(error);
    return NextResponse.json(
      { error: "failed to fetch alumni"},
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
   await alumnimodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "alumni deleted successfully",
      },
      { status: 200 }
    );
   } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json(
      { error: "Failed to delete alumni" },
      { status: 500 }
    )
   }

}

