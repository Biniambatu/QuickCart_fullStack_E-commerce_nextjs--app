import connectDB from "@/config/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request:any) {
    try {
        // Use auth() which handles Bearer tokens
        let { userId } = await auth()

        // Fallback: try extracting from Authorization header if auth() fails
        if (!userId) {
            const authHeader = request.headers.get('authorization')
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.replace('Bearer ', '')
                try {
                    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
                    userId = payload.sub || payload.user_id || null
                } catch (decodeError) {
                    console.error('Failed to decode token:', decodeError)
                }
            }
        }

        if (!userId) {
            return NextResponse.json({ success:false, message: "Unauthorized" }, { status: 401 })
        }

        await connectDB()
        
        const user = await User.findById(userId)
        
        if (!user) {
            return NextResponse.json({ success:false, message: "User not found" })
        }

        // Ensure cartItems is always an object, never null/undefined
        const cartItems = user.cartItems || {}

        return NextResponse.json({ success:true, cartItems })

    } catch (error: any) {
        console.error('Error getting cart:', error)
        return NextResponse.json({ success:false, message: error.message || 'Failed to get cart' }, { status: 500 })
    }
}