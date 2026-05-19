import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const API_KEY = request.headers.get("X-API-KEY");

  // Verify the secret token for security
  if (API_KEY !== (process.env.X_API_KEY || "")) {
    return NextResponse.json({ Result: null, ErrorMessages: ["Unauthorized API Call"] }, { status: 403 });
  }

  try {
    revalidatePath('/', 'layout');
    return NextResponse.json({ Result: { revalidated: true }, ErrorMessages: [] }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ Result: null, ErrorMessages: [(err as Error).message || "Unknown error"] }, { status: 500 });
  }
}