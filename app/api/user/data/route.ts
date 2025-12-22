import connectDB from "@/config/db";
import User from "@/models/User";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request:any) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({success: false, message: 'User not found'})
    }

    if (!user.cartItems) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({ success: true, user });

  } catch (error: any) {
    console.error("User data error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
