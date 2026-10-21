import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className="relative mx-auto w-full animate-[fedeIn_1s] cursor-pointer overflow-hidden rounded-[15px] bg-white shadow-[0_0_10px_#00000015] transition-[transform,box-shadow] duration-300 ease-[ease] hover:-translate-y-[5px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] min-[1200px]:rounded-[20px] min-[1200px]:shadow-[0_4px_16px_rgba(0,0,0,0.08)] min-[1200px]:hover:-translate-y-2 min-[1200px]:hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]" onClick={onSelect} onKeyDown={(event) => event.key === 'Enter' && onSelect?.()} role={onSelect ? 'button' : undefined} tabIndex={onSelect ? 0 : undefined}>
        <div className="relative">
            <img className="aspect-square w-full rounded-t-[15px] object-cover" src={image} alt="" />
            {
                !cartItems[id]
                ?<img className="absolute bottom-[15px] right-[15px] w-[35px] cursor-pointer rounded-full transition duration-200 hover:scale-110 min-[1200px]:right-5 min-[1200px]:bottom-5 min-[1200px]:w-[42px] max-[600px]:right-[10px] max-[600px]:bottom-[10px] max-[600px]:w-[30px]" onClick={handleAddToCart} src={assets.add_icon_white}/>
                :
                <div className="absolute bottom-[15px] right-[15px] flex items-center gap-[10px] rounded-[50px] bg-white p-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.10)] min-[1200px]:right-5 min-[1200px]:bottom-5 min-[1200px]:gap-[14px] min-[1200px]:px-3 min-[1200px]:py-2 max-[600px]:right-[10px] max-[600px]:bottom-[10px] max-[600px]:gap-[6px] max-[600px]:px-2 max-[600px]:py-1">
                    <img className="w-[30px] cursor-pointer min-[1200px]:w-[34px] max-[600px]:w-[24px]" onClick={(event)=>{ event.stopPropagation(); handleCartAction(removeFromCart) }} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img className="w-[30px] cursor-pointer min-[1200px]:w-[34px] max-[600px]:w-[24px]" onClick={(event)=>{ event.stopPropagation(); handleCartAction(addToCart) }} src={assets.add_icon_green} alt="" />
                </div>
                
            }
        </div>
        <div className="p-5 min-[1200px]:px-6 min-[1200px]:pt-6 min-[1200px]:pb-[30px] max-[600px]:p-[14px]">
            <div className="mb-[10px] flex items-center justify-between">
                <p className="text-[20px] font-medium min-[1200px]:text-[24px] max-[600px]:text-[17px]">{name}</p>
                <img className="w-[70px] min-[1200px]:w-[80px] max-[600px]:w-[60px]" src={assets.rating_starts} alt="" />
            </div>
            <p className="my-2 text-xs leading-[1.4] text-[#676767] min-[1200px]:my-3 min-[1200px]:text-[15px] min-[1200px]:leading-[1.6]">
                {description}
            </p>
            <p className="my-[10px] text-[22px] font-medium text-[tomato] min-[1200px]:my-[15px] min-[1200px]:text-[26px] max-[600px]:text-[18px]">
                Rs. {price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem