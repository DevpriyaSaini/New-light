import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import toppermodel from '@/model/topper';
import { Connectiondb } from '@/lib/dbconnect';

interface RequestBody {
  studentname: string;
  position: string;
  description: string;
  publicId: string;
}

export async function POST(request: Request) {
  try {
    await Connectiondb();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['studentname', 'position', 'description', 'publicId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields,
          received: {
            studentname: body.studentname,
            position: body.position,
            description: body.description,
            publicId: body.publicId
          }
        },
        { status: 400 }
      );
    }

    const topper = await toppermodel.create({
      studentname: body.studentname,
      position: body.position,
      description: body.description,
      image: body.publicId
    });

    return NextResponse.json(topper, { status: 201 });
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
    const toppers = await toppermodel.find().sort({ createdAt: 1 });
    return NextResponse.json(toppers, { status: 200 });
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

     const { id } = await request.json();
   await toppermodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "Topper deleted successfully",
      },
      { status: 200 }
    );
   } catch (error: unknown) {
    console.error("Error deleting topper:", error);
    return NextResponse.json(
      { error: "Failed to delete topper" },
      { status: 500 }
    )
   }

}