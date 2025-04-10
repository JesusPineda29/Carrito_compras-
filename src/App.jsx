import { useState } from "react"
import { useEffect } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Guitar } from "./components/Guitar"
import { db } from "./data/db"


function App() { 

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])




  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExist>=0) {
      if(cart[itemExist].quantity >= 5) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

  }



  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }



  function increaseQuantity(id) {
    const upDatedCart = cart.map(item => {
      if(item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(upDatedCart)
  }



  function decrementQuantity(id) {
    const downDateCart = cart.map(i => {
      if(i.id === id && i.quantity > 1) {
        return {
          ...i,
          quantity: i.quantity - 1
        }
      }
      return i
    })
    setCart(downDateCart)
  }



  function clearCart() {
    setCart([])
  }



  




  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>(
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                
                />                
            ))}
            
        
        </div>
    </main>

    <Footer/>

    </>
  )
}

export default App
