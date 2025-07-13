import { Connectiondb } from "@/lib/dbconnect";
import Usermodel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface SendMailParams {
  name: string;
  email: string;
  token: string;

}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER!,  
    pass: process.env.GMAIL_APP_PASS!  
  }
});

async function sendmail({email, name, token}: SendMailParams) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      throw new Error("Email credentials not configured");
    }

    const mailOptions = {
      from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Account',
      html: `<p>Hi ${name}, your verification code is: <strong>${token}</strong></p>`
    };

    const info = await transporter.sendMail(mailOptions);
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
    const {username, email, password} = await request.json();
    
    
    

    // Check existing user
    const existuser = await Usermodel.findOne({ username });
    if (existuser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    // Generate verifyCode and expiry date
    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour expiry

    // Check existing email
    const existemail = await Usermodel.findOne({ email });
    if (existemail) {
      if (existemail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists and is verified",
          },
          { status: 400 }
        );
      } else {
        // Update existing unverified user
        existemail.password = password;
        existemail.verifyCode = verifycode;
        existemail.verifyCodeExpiry = expiryDate;
        await existemail.save();
      }
    } else {
      // Create new user
      const newuser = new Usermodel({
        username,
        email,
        password,
        verifyCode: verifycode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });
      await newuser.save();
    }

    // Send verification email
    try {
      const emailInfo = await sendmail({
        email: email,
        name: username,
        token: verifycode
      });

      console.log('Email sent successfully:', emailInfo.response);
      
      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email.",
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email",
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}


  
    