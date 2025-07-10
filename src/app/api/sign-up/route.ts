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
    user: process.env.GMAIL_USER,  
    pass: process.env.GMAIL_APP_PASS  
  }
});

async function sendmail({email, name, token}: SendMailParams) {
  try {
    const mailOptions = {
      from: 'devpriyasaini6@gmail.com',
      to: email,
      subject: 'To verify your account',
      html: `<p>Hi ${name}, To verify your account, please copy the One-Time Password (OTP) below and paste it into the OTP input field:<br> ${token}</p>`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  await Connectiondb();
  try {
    const {username, email, password, secret} = await request.json();
    
    
    

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