import mongoose from "mongoose";
import resultmodel from "@/model/result";
import { NextRequest, NextResponse } from "next/server";
import { Connectiondb } from "@/lib/dbconnect";// Assuming you have this utility

export async function GET(request: NextRequest) {
    try {
        // Get studentId from query parameters instead of body
        const url = new URL(request.url);
        const studentId = url.searchParams.get('studentId');

        // Validate studentId
        if (!studentId) {
            return NextResponse.json(
                { error: "studentId query parameter is required" },
                { status: 400 }
            );
        }

        // Connect to database
        await Connectiondb();

        // Find the report card
        const reportcard = await resultmodel.findOne({ studentId });

        if (!reportcard) {
            return NextResponse.json(
                { error: "Report card not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(reportcard, { status: 200 });

    } catch (error) {
        console.error("Error fetching report card:", error);
        return NextResponse.json(
            { error: "Failed to fetch report card" },
            { status: 500 }
        );
    }
}