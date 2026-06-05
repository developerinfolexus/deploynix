import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const session = await verifyAuth(token.value);

        if (!session || session.role !== "employer") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { job_title, job_description, company_name, location, salary_range } = body;

        if (!job_title || !job_description || !company_name || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const job = await db.job.create({
            data: {
                job_title,
                job_description,
                company_name,
                location,
                salary_range: salary_range || "Not specified",
                posted_by: session.userId,
            },
        });

        return NextResponse.json({ message: "Job created successfully", job }, { status: 201 });
    } catch (error) {
        console.error("Job Creation Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const jobs = await db.job.findMany({
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
