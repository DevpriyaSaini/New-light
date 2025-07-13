import { Connectiondb } from "@/lib/dbconnect";
import Usermodel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface SendMailParams {
  name: string;
  email: string;
  token: string;
}

// Initialize transporter outside the handler
let transporter: nodemailer.Transporter;

async function getTransporter() {
  if (!transporter) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      throw new Error("Email credentials not configured");
    }
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });
  }
  return transporter;
}

async function sendmail({email, name, token}: SendMailParams) {
  try {
    const mailer = await getTransporter();
    const info = await mailer.sendMail({
      from: `"Your App" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Account',
      html: `<p>Hi ${name}, your verification code is: <strong>${token}</strong></p>`
    });
    console.log('Email sent to:', email);
    return info;
  } catch (error) {
    console.error('Email failed to:', email, 'Error:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  await Connectiondb();
  
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate verification code
    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour expiry

    // Check for existing user
    const existingUser = await Usermodel.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { success: false, message: "User already exists and is verified" },
          { status: 400 }
        );
      }
      
      // Update existing unverified user
      existingUser.password = password;
      existingUser.verifyCode = verifycode;
      existingUser.verifyCodeExpiry = expiryDate;
      await existingUser.save();
    } else {
      // Create new user
      await Usermodel.create({
        username,
        email,
        password,
        verifyCode: verifycode,
        verifyCodeExpiry: expiryDate,
        isVerified: false
      });
    }

    // Send verification email
    await sendmail({
      email: email,
      name: username,
      token: verifycode
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error registering user",
      },
      { status: 500 }
    );
  }
}