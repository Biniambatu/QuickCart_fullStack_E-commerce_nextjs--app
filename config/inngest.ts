import { Inngest } from "inngest";
import connectDB from "./db";

import Order from "@/models/Order";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest fun to save userdata to a DB
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data

        // Extract email from Clerk webhook event
        let email = ''
        if (email_addresses && email_addresses.length > 0) {
            // Clerk webhook structure: email_addresses is an array of objects
            // Try different possible structures
            const firstEmailObj = email_addresses[0]
            email = firstEmailObj?.email_address || firstEmailObj?.emailAddress || ''

            // If still no email, try to find primary email
            if (!email) {
                const primaryEmail = email_addresses.find((e: any) => e.id === event.data.primary_email_address_id)
                email = primaryEmail?.email_address || primaryEmail?.emailAddress || ''
            }
        }

        if (!email) {
            console.error('No email found in Clerk webhook event:', {
                eventData: event.data,
                email_addresses: email_addresses
            })
            // Don't create user without email - let API route handle it
            return
        }

        const userData = {
            _id: id,
            email: email,
            name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
            imageUrl: image_url || '',
            cartItems: {}
        }

        try {
            await connectDB()
            await User.create(userData)
            console.log('User created via Inngest sync:', { id, email })
        } catch (createError: any) {
            // If user already exists, update it with email if missing
            if (createError.code === 11000) {
                const existingUser = await User.findById(id)
                if (existingUser && (!existingUser.email || existingUser.email === '')) {
                    existingUser.email = email
                    await existingUser.save()
                    console.log('Updated existing user with email via Inngest:', { id, email })
                }
            } else {
                console.error('Error creating user via Inngest:', createError)
                throw createError
            }
        }
    }
)

// inngest fun to update user data in DB
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data

        // Extract email from Clerk webhook event
        let email = ''
        if (email_addresses && email_addresses.length > 0) {
            // Clerk webhook structure: email_addresses is an array of objects
            const firstEmailObj = email_addresses[0]
            email = firstEmailObj?.email_address || firstEmailObj?.emailAddress || ''

            // If still no email, try to find primary email
            if (!email) {
                const primaryEmail = email_addresses.find((e: any) => e.id === event.data.primary_email_address_id)
                email = primaryEmail?.email_address || primaryEmail?.emailAddress || ''
            }
        }

        if (!email) {
            console.error('No email found in Clerk webhook update event:', {
                eventData: event.data,
                email_addresses: email_addresses
            })
            return
        }

        await connectDB()

        // Get existing user to preserve cartItems
        const existingUser = await User.findById(id)

        const userData: any = {
            _id: id,
            email: email,
            name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
            imageUrl: image_url || ''
        }

        // Only set cartItems if user doesn't exist (new user), otherwise preserve existing cartItems
        if (!existingUser) {
            userData.cartItems = {}
        }
        // If user exists, don't include cartItems in update to preserve it

        await User.findByIdAndUpdate(id, userData, { upsert: true, setDefaultsOnInsert: true })
        console.log('User updated via Inngest sync:', { id, email })
    }
)

// inngest fun to delete user from DB
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk',
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({ event }) => {
        const { id } = event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

//ingest function to create users order in database

export const createUserOrder = inngest.createFunction(
    {
        id:'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        }
    },
    {
        event: 'order/created'
    },
    async ({events}) => {

        const orders = events.map((event) => {
            return {
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
        } )

        await connectDB()
        await Order.insertMany(orders)

        return { success: true, processed: orders.length }
    }  
)