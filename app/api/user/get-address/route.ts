import connectDB from "@/config/db";
import Address from "@/models/Address";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: any) {
    try {
        // Use auth() which should handle both cookies and Bearer tokens
        let { userId } = await auth()

        if (!userId) {
            // If auth() fails, try extracting from Authorization header manually
            const authHeader = request.headers.get('authorization')
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.replace('Bearer ', '')
                // Decode JWT to get userId (simple approach - Clerk tokens contain userId in payload)
                try {
                    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
                    const extractedUserId = payload.sub || payload.user_id || null
                    if (extractedUserId) {
                        // Verify user exists in Clerk
                        const client = await clerkClient()
                        await client.users.getUser(extractedUserId)
                        userId = extractedUserId
                    }
                } catch (decodeError) {
                    console.error('Failed to decode token:', decodeError)
                }
            }
        }

        if (!userId) {
            console.error('No userId found - user not authenticated')
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        await connectDB()

        const addresses = await Address.find({ userId })

        return NextResponse.json({ success: true, addresses })

    } catch (error) {
        console.error('Error in /api/user/get-address:', error)
        return NextResponse.json({ success: false, message: (error as any).message }, { status: 500 })
    }
}