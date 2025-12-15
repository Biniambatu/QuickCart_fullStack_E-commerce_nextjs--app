'use client'

import { productsDummyData } from "@/assets/assets";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

    export const AppContext = createContext<any>(null)

    export const useAppContext = () => {
        return useContext(AppContext)
    }
export const AppContextProvider = (props:any) => {
   
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY
    
    const [ products, setProducts ] = useState([])
    const [isSeller, setIsSeller] = useState(true)
    const [userData, setUserData] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const { user } = useUser()

    const fetchProductData = async () => {
         setProducts(productsDummyData as any)
     }
      useEffect(() => {
         fetchProductData()
     }, [])

      const addToCart = async (itemId: any) => {
    let cartData: any = structuredClone(cartItems);

    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

    setCartItems(cartData);
};


     const updateCartQuantity = async (itemId:any, quantity:any) => {

        let cartData:any = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

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
        setUserData, user
    }
     return (
         <AppContext.Provider value={value}>
             {props.children}
         </AppContext.Provider>
     )
}

