import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import resultmodel from '@/model/result';
import { Connectiondb } from '@/lib/dbconnect';

interface RequestBody {
  studentname: string;
  studentId:string;
  class:string;
  position: string;
  description: string;
  publicId: string;
}

export async function POST(request: Request) {
  try {
    await Connectiondb();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['studentname','studentId','class', 'position', 'description', 'publicId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          missingFields,
          received: {
            studentname: body.studentname,
            studentId:body.studentId,
            class:body.class,
            position: body.position,
            description: body.description,
            publicId: body.publicId
          }
        },
        { status: 400 }
      );
    }

    const topper = await resultmodel.create({
     studentname: body.studentname,
            studentId:body.studentId,
            class:body.class,
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
    
    const toppers = await resultmodel.aggregate([
      {
        $addFields: {
          // Create a custom sort order based on class
          classOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$class", "Nursery"] }, then: 1 },
                { case: { $eq: ["$class", "LKG"] }, then: 2 },
                { case: { $eq: ["$class", "UKG"] }, then: 3 },
                { case: { $eq: ["$class", "1"] }, then: 4 },
                { case: { $eq: ["$class", "2"] }, then: 5 },
                { case: { $eq: ["$class", "3"] }, then: 6 },
                { case: { $eq: ["$class", "4"] }, then: 7 },
                { case: { $eq: ["$class", "5"] }, then: 8 },
                { case: { $eq: ["$class", "6"] }, then: 9 },
                { case: { $eq: ["$class", "7"] }, then: 10 },
                { case: { $eq: ["$class", "8"] }, then: 11 },
                { case: { $eq: ["$class", "9"] }, then: 12 },
                { case: { $eq: ["$class", "10"] }, then: 13 }
              ],
              default: 14 // For any other classes not specified
            }
          }
        }
      },
      {
        $sort: {
          classOrder: 1,  // Sort by our custom class order
          createdAt: 1    // Then by creation date
        }
      },
      {
        $project: {
          classOrder: 0  // Remove the temporary field from output
        }
      }
    ]);

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
    await Connectiondb()

    // Get the ID from query parameters instead of request body
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      )
    }

    const deletedResult = await resultmodel.findByIdAndDelete(id)

    if (!deletedResult) {
      return NextResponse.json(
        { error: "Result not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Result deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting result:", error)
    return NextResponse.json(
      { error: "Failed to delete result" },
      { status: 500 }
    )
  }
}
 