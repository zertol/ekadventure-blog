import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handle GET requests
export async function GET() {
    const response = await fetch("https://google.com");

    //   const result = await response.json();



    return NextResponse.json(
        response
    );
}

// Handle POST requests
export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Verify environment variable
        const gmailPassword = process.env.GMAIL_APP_PASSWORD;
        if (!gmailPassword) {
            console.error("Gmail app password is not set in environment variables");
            throw new Error("Email configuration error");
        }

        // Create a transporter using Gmail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // TLS requires secure:false and port:587
            requireTLS: true, // Force TLS
            auth: {
                user: "e.kadvnture@gmail.com",
                pass: gmailPassword.replace(/['"]/g, ''), // Remove any quotes
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });

        // Verify transporter
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error("Transporter verification failed:", verifyError);
            throw new Error("Email service configuration error");
        }

        // Email content
        const mailOptions = {
            from: {
                name: name,
                address: "e.kadvnture@gmail.com" // Use your email as sender to avoid spam
            },
            replyTo: email, // Set reply-to as the user's email
            to: "e.kadvnture@gmail.com",
            subject: `Contact Form: ${subject}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // Send the email
        try {
            await transporter.sendMail(mailOptions);
        } catch (sendError) {
            console.error("Error sending email:", sendError);
            throw new Error("Failed to send email");
        }

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json(
            {
                message: "Error sending email",
                error: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
} 