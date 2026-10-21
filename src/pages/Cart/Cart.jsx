import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext)
  const navigate= useNavigate()
  return (
    <div className='mt-[100px]'>
      <div className="cart-items">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[gray]">
          <p>Items</p>
          <p>title</p>
          <p>Price</p>
          <p>Quentity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="h-px border-0 bg-[#e2e2e2]" />
  
        {
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return(
              <div key={item._id}>
                <div   className='my-[10px] grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black'>
                  <img className="w-[50px]" src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs.{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cursor-pointer hover:text-[red]'>x</p>
                </div>
              
                  <hr className="h-px border-0 bg-[#e2e2e2]" />
                    </div>)
                
              
            }
          })
        }
      </div>
      <div className='mt-[80px] flex justify-between gap-[max(12vw,20px)] max-[750px]:flex-col-reverse'>
        <div className="flex flex-1 flex-col gap-[20px]">
          <h2>Cart Totals</h2>
          <div>
            <div className="flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr className="my-[10px] h-px border-0 bg-[#e2e2e2]" />
            <div className="flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount()===0?0:150}</p>
            </div>
            <hr className="my-[10px] h-px border-0 bg-[#e2e2e2]" />
            <div className="flex justify-between text-[#555]">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount()===0?0: getTotalCartAmount()+150}</b>
            </div>
           
          </div>
           <button className="w-[max(15vw,200px)] cursor-pointer rounded-[4px] border-0 bg-[tomato] py-[12px] text-white hover:bg-[rgb(202,116,101)]" onClick={()=>navigate('/order')}>POCEED TO CHECKOUT</button>

        </div>
        <div className="flex-1 max-[750px]:justify-start">
          <p className="text-[#555]">If you have a promo code, Enter it here</p>
          <div className="mt-[10px] flex items-center justify-between rounded-[4px] bg-[#eaeaea]">
            <input className="border-0 bg-transparent pl-[10px] outline-none" type="text" placeholder='Enter Promo Code' name="" id="" />
            <button className="w-[max(10vw,150px)] rounded-[4px] border-0 bg-black px-[5px] py-[12px] text-white">Submit</button>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Cart