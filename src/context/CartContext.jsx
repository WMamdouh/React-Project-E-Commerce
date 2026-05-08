import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {

    const token = localStorage.getItem("userToken");
    let [cart,setCart] = useState(null);

    const headers = {
        token
    };
    

    function addToCart(productId) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
            { productId },
            { headers }
        ).then(res => res.data);
    }

    function getCartItems() {
        return axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart",
            { headers }
        ).then(res => res.data);
    }

    function removeCartItem(cartItemId) {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
            { headers }
        ).then(res => res.data);
    }

    function updateCartItem(cartItemId, count) {
        return axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
            { count },
            { headers }
        ).then(res => res.data);
    }

    function checkOut(cartId, url,formValues) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            { shippingAddress: formValues },
            { headers }
        ).then(res => res.data);
    }

    async function getCart() {
        try {
            const res = await getCartItems();
            setCart(res);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getCart();
    }, []);

    return (
        <CartContext.Provider value={{
            addToCart,
            getCartItems,
            removeCartItem,
            updateCartItem,
            checkOut,
            cart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    );
}