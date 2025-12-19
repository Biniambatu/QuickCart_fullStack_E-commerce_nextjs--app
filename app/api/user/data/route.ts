import connectDB from "@/config/db";
import User from "@/models/User";
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
    let user = await User.findById(userId)

    // Always fetch Clerk user to get latest data including email
    const client = await clerkClient()
    const clerkUser = await client.users.getUser(userId)

    if (!clerkUser) {
      return NextResponse.json({ success: false, message: "User Not Found in Clerk" })
    }

    // Extract email from Clerk user
    let email = ''
    if (clerkUser.emailAddresses && clerkUser.emailAddresses.length > 0) {
      // Find primary email by matching the ID
      if (clerkUser.primaryEmailAddressId) {
        const primaryEmail = clerkUser.emailAddresses.find(
          (e: any) => e.id === clerkUser.primaryEmailAddressId
        )
        if (primaryEmail) {
          email = primaryEmail.emailAddress || ''
        }
      }

      // Fallback to first email if primary not found
      if (!email) {
        email = clerkUser.emailAddresses[0]?.emailAddress || ''
      }
    }

    if (!email) {
      console.error('No email found in Clerk user:', {
        id: clerkUser.id,
        emailAddresses: clerkUser.emailAddresses,
        primaryEmailAddressId: clerkUser.primaryEmailAddressId
      })
      return NextResponse.json({ success: false, message: "Email not found in Clerk user data" })
    }

    if (!user) {
      // User doesn't exist in DB, create it
      const userData = {
        _id: clerkUser.id,
        email: email,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'User',
        imageUrl: clerkUser.imageUrl || '',
        cartItems: {}
      }

      try {
        user = await User.create(userData)
        console.log('User created successfully:', { id: user._id, email: user.email })
      } catch (createError: any) {
        console.error('Error creating user:', createError)
        // If user already exists (race condition), fetch it
        if (createError.code === 11000) {
          user = await User.findById(clerkUser.id)
          // Still need to update email if missing
          if (user && (!user.email || user.email === '')) {
            user.email = email
            await user.save()
          }
        } else {
          throw createError
        }
      }
    } else {
      // User exists - check if email is missing or needs update
      const needsEmailUpdate = !user.email || user.email === '' || user.email.trim() === ''

      if (needsEmailUpdate) {
        console.log('User exists but email is missing, updating...', {
          userId: user._id,
          currentEmail: user.email,
          newEmail: email
        })
        user.email = email

        // Also update other fields if they're missing
        if (!user.name || user.name === 'User') {
          user.name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'User'
        }
        if (!user.imageUrl) {
          user.imageUrl = clerkUser.imageUrl || ''
        }

        // Preserve cartItems - ensure it exists and is an object
        if (!user.cartItems || typeof user.cartItems !== 'object') {
          user.cartItems = {}
        }

        try {
          await user.save()
          console.log('User updated with email:', { id: user._id, email: user.email })
        } catch (saveError: any) {
          console.error('Error saving user with email:', saveError)
          throw saveError
        }
      } else {
        // Ensure cartItems exists even if email is already present
        if (!user.cartItems || typeof user.cartItems !== 'object') {
          user.cartItems = {}
          await user.save()
        }
      }
    }

    // Ensure cartItems is always an object before returning
    if (!user.cartItems || typeof user.cartItems !== 'object') {
      user.cartItems = {}
      await user.save()
    }

    return NextResponse.json({ success: true, user })
  }
  catch (error: any) {
    console.error('Error in /api/user/data:', error)
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 })

  }

} 