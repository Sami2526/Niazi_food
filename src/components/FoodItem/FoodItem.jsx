import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image,onSelect}) => {
    // const [itemCount, setItemCount] = useState(0)
    const {cartItems,addToCart,removeFromCart,user,loading}=useContext(StoreContext)
    const navigate = useNavigate()
    const handleCartAction = (action) => {
        if (loading) return
        if (!user) {
            navigate('/login')
            return
        }
        action(id)
    }
    const handleAddToCart = (event) => {
        event.stopPropagation()
        if (loading) return
        if (!user) {
            navigate('/login')
            return
        }
        addToCart(id)
    }
  return (
    <div className='food-item' onClick={onSelect} onKeyDown={(event) => event.key === 'Enter' && onSelect?.()} role={onSelect ? 'button' : undefined} tabIndex={onSelect ? 0 : undefined}>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt="" />
            {
                !cartItems[id]
                ?<img className='add' onClick={handleAddToCart} src={assets.add_icon_white}/>
                :
                <div className='food-item-counter'>
                    <img onClick={(event)=>{ event.stopPropagation(); handleCartAction(removeFromCart) }} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={(event)=>{ event.stopPropagation(); handleCartAction(addToCart) }} src={assets.add_icon_green} alt="" />
                </div>
                
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-des">
                {description}
            </p>
            <p className="food-item-price">
                Rs. {price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem