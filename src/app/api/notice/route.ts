import mongoose from "mongoose";
import noticemodel from "@/model/notice";
import { NextRequest, NextResponse } from "next/server";
import { Connectiondb } from "@/lib/dbconnect";
import { error } from "console";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export interface Notice{
    notice:string;
    Adminname:string;
}

export async function POST(request: Request) {
  try {
    await Connectiondb();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [ 'notice', 'Adminname'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields,
          received: {
            
            notice: body.notice,
            Adminname: body.Adminname
          }
        },
        { status: 400 }
      );
    }

    const notice = await noticemodel.create({
       notice: body.notice,
            Adminname: body.Adminname
      
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await Connectiondb();
    const notice = await noticemodel.find().sort({ createdAt: 1 });
    return NextResponse.json(notice, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch toppers" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "User is unauthorized" },
        { status: 401 }
      );
    }

    await Connectiondb();

     const url = new URL(request.url);
        const id = url.searchParams.get('id');
    await noticemodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "notice deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting notice:", error);
    return NextResponse.json(
      { error: "Failed to delete notice" },
      { status: 500 }
    );
  }
}