import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { Connectiondb } from '@/lib/dbconnect';
import alumnimodel from '@/model/alumni';

// app/api/submit/route.ts

interface RequestBody {
  studentname: string;
  post: string;
  description: string;
  publicId: string;
}

export async function POST(request: Request) {
  try {
    await Connectiondb();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['studentname', 'post', 'description', 'publicId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields,
          received: {
            studentname: body.studentname,
            post: body.post,
            description: body.description,
            publicId: body.publicId
          }
        },
        { status: 400 }
      );
    }

    const topper = await alumnimodel.create({
      studentname: body.studentname,
      post: body.post,
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
    const toppers = await alumnimodel.find().sort({ createdAt: 1 });
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
    await alumnimodel.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: "Alumni deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting Alumni:", error);
    return NextResponse.json(
      { error: "Failed to delete Alumni" },
      { status: 500 }
    );
  }
}