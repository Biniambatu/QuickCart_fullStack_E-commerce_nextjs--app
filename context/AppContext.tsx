'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


    export const AppContext = createContext<any>(null)

    export const useAppContext = () => {
        return useContext(AppContext)
    }

    export const AppContextProvider = (props:any) => {
   
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY
    
    const [ products, setProducts ] = useState([])
    const [isSeller, setIsSeller] = useState(false)
    const [userData, setUserData] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const { user } = useUser()
    const { getToken } = useAuth()

    const fetchProductData = async () => {

        try {
            
            const { data } = await axios.get('/api/product/list')

            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error((error as any).message)
        }
    }

    const fetchUserData = async () => {
       try {
       
        if (user?.publicMetadata.role === 'seller') {
            setIsSeller(true)
        }

        const token = await getToken()

        const { data } = await axios.get('/api/user/data', { headers: {Authorization: `Bearer ${token}`}})

        if (data.success) {
           setUserData(data.user)   
           setCartItems(data.user.cartItems)
        }  else {
            toast.error(data.message)
        }

       } catch (error:any) {
            toast.error(error.message)      
       }
    }

     useEffect(() => {
         fetchProductData()
     }, [])

     useEffect(() => {
        if(user){
            fetchUserData()
        }
     }, [user])
    

     const addToCart = async (itemId: any) => {
     
        let cartData: any = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (user) {
            try {
                const token = await getToken()

                await axios.post('/api/cart/update', {cartData},{ headers: {Authorization: `Bearer ${token}`}})

                toast.success('Item added to cart')

            } catch (error) {
                toast.error((error as any).message)      
            }
        }
        
    };

     const updateCartQuantity = async (itemId:any, quantity:any) => {

        let cartData:any = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
         if (user) {
            try {
                const token = await getToken()

                await axios.post('/api/cart/update', {cartData},{ headers: {Authorization: `Bearer ${token}`}})

                toast.success('Cart updated')

            } catch (error) {
                toast.error((error as any).message)      
            }
        }

    }

    const getCartCount = () => {
        let totalCount  = 0;
        for (const items in cartItems as any) {
            if ((cartItems as any)[items]  > 0) {
                totalCount += (cartItems as any)[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => (product as any)._id === items);
            if ((cartItems as any)[items] > 0) {
                totalAmount += (itemInfo as any).offerPrice * (cartItems as any)[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const value = {
        router, products, 
        fetchProductData, addToCart, 
        cartItems, setCartItems,
        updateCartQuantity, 
        getCartAmount, getCartCount, 
        currency, isSeller,
        setIsSeller, userData, 
        setUserData, user,
        fetchUserData, getToken
    }
     return (
         <AppContext.Provider value={value}>
             {props.children}
         </AppContext.Provider>
     )
}

