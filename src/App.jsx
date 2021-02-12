import React, {useState, useEffect} from "react";
import './App.css'
import Products from './Products'
import Footer from "./Footer";
import Header from "./Header";
import { Routes, Route } from 'react-router-dom'
import Detail from './Detail'
import Cart from './Cart'
import Checkout from './Checkout'


export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []
    } catch {
      console.log("The cart could not be parsed into JSON")
      return [];
    }
  })

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
       
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
     return quantity === 0 ? items.filter((i) => i.sku !== sku)
      : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }


  return (
    <>
      <div className="content">
        <Header/>
        <main>
          <Routes>
          <Route path="/" element={<h1>Welcome to Craved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail
              addToCart={addToCart}/>} />
            <Route path="/cart" element={<Cart cart={cart}
              updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
