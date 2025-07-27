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
    
    const result = await festmodel.aggregate([
      {
        $match: {
          ftype: { $in: ["Cultural", "Academic"] } // Only fetch these two types
        }
      },
      {
        $group: {
          _id: "$ftype", // Group by fest type
          fests: {
            $push: {
              _id: "$_id",
              title: "$title",
              description: "$description",
              image: "$image",
              createdAt: "$createdAt"
            }
          },
          count: { $sum: 1 } // Count of fests in each category
        }
      },
      {
        $sort: { "_id": 1 } // Sort the groups (1 for ascending, -1 for descending)
      }
    ]);

    // Transform the result into a more usable format
    const formattedResult = {
      culturalFests: result.find(group => group._id === "Cultural")?.fests || [],
      academicFests: result.find(group => group._id === "Academic")?.fests || [],
    };

    return NextResponse.json(formattedResult, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching fests:", error);
    return NextResponse.json(
      { error: "Failed to fetch fests" },
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