import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { Connectiondb } from '@/lib/dbconnect';
import festmodel from '@/model/fest';

// app/api/submit/route.ts

interface RequestBody {
  fest: string;
  description: string;
  ftype: string;
  publicId: string;
}

export async function POST(request: Request) {
  try {
    await Connectiondb();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['fest','ftype', 'description', 'publicId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields,
          received: {
            fest: body.fest,
            ftype: body.ftype,
            description: body.description,
            publicId: body.publicId
          }
        },
        { status: 400 }
      );
    }

    const topper = await festmodel .create({
      fest: body.fest,
      ftype: body.ftype,
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
    const toppers = await festmodel.find().sort({ createdAt: 1 });
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
    await festmodel.findByIdAndDelete(id);

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