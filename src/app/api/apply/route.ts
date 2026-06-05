import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { uploadResumeToDrive } from "@/lib/google-drive";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const session = await verifyAuth(token.value);

        if (!session || session.role !== "candidate") {
            return NextResponse.json({ error: "Unauthorized. Only candidates can apply for jobs." }, { status: 401 });
        }

        const formData = await req.formData();
        const jobId = formData.get("job_id") as string;
        const applicantName = formData.get("applicant_name") as string || "";
        const phone = formData.get("phone") as string || "";
        const address = formData.get("address") as string || "";
        const resumeFile = formData.get("resume") as File | null;

        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        if (!applicantName.trim()) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        // Check if already applied
        const existingApplication = await db.application.findFirst({
            where: {
                job_id: jobId,
                candidate_id: session.userId,
            },
        });

        if (existingApplication) {
            return NextResponse.json({ error: "You have already applied for this job." }, { status: 409 });
        }

        let resumeUrl = "No resume provided";

        // Upload resume to Google Drive if provided
        if (resumeFile && resumeFile.size > 0) {
            // Validate file type
            const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            if (!allowedTypes.includes(resumeFile.type)) {
                return NextResponse.json({ error: "Only PDF and Word documents are allowed." }, { status: 400 });
            }

            // Validate file size (5MB max)
            if (resumeFile.size > 5 * 1024 * 1024) {
                return NextResponse.json({ error: "File size must be under 5MB." }, { status: 400 });
            }

            const buffer = Buffer.from(await resumeFile.arrayBuffer());
            const timestamp = Date.now();
            const safeName = `resume_${session.userId}_${timestamp}_${resumeFile.name}`;

            const driveResult = await uploadResumeToDrive(buffer, safeName, resumeFile.type);
            resumeUrl = driveResult.webViewLink;
        }

        const application = await db.application.create({
            data: {
                job_id: jobId,
                candidate_id: session.userId,
                applicant_name: applicantName.trim(),
                phone: phone.trim(),
                address: address.trim(),
                resume_url: resumeUrl,
            },
        });

        return NextResponse.json({ message: "Application submitted successfully", application }, { status: 201 });
    } catch (error: any) {
        console.error("Application Error:", error);
        const message = error?.message || error?.errors?.[0]?.message || "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
