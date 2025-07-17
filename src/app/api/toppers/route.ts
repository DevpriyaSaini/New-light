import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import toppermodel from '@/model/topper';
import { Connectiondb } from '@/lib/dbconnect';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Connectiondb();

    const formData = await request.formData();
    const studentname = formData.get('studentname') as string;
    const position = formData.get('position') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!studentname || !position || !description || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Handle file upload
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(imageFile.name);
    const filename = `${uniqueSuffix}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const topper = await toppermodel.create({
      studentname,
      position,
      description,
      image: `/uploads/${filename}`
    });

    return NextResponse.json(topper, { status: 201 });

  } catch (error: unknown) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await Connectiondb();
    const toppers = await toppermodel.find().sort({ createdAt: -1 });
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