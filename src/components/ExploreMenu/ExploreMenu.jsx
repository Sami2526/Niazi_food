import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="my-[30px] scroll-mt-24 flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" id="explore-menu">
        <h1 className="text-[clamp(28px,4vw,44px)] font-medium text-[#262626]">Explore Our Menu</h1>
        <p className="max-w-[60%] text-[clamp(14px,1.2vw,18px)] leading-[1.6] text-[#808080] min-[1200px]:max-w-[70%] max-[1050px]:max-w-full max-[1050px]:text-[14px]">We are committed to providing great food, excellent service, and a memorable dining experience. With every order, we strive to make your favorite meals easier to enjoy</p>
        <div className="my-5 flex snap-x snap-mandatory gap-[30px] overflow-x-auto pb-[10px] text-center [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[1200px]:flex-wrap min-[1200px]:justify-center min-[1200px]:gap-x-[50px] min-[1200px]:gap-y-[40px] min-[1200px]:overflow-x-visible min-[1200px]:snap-none max-[600px]:gap-5 max-[600px]:py-[10px]">
            {
                menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(pre=> pre===item.menu_name?"All":item.menu_name)} key={index} className="flex-none snap-start">
                            <img className={`h-auto w-[clamp(80px,7.5vw,140px)] cursor-pointer rounded-full object-cover transition duration-200 max-[600px]:w-[70px] max-[600px]:min-w-[70px] ${category===item.menu_name?"border-4 border-[tomato] p-[2px]":""}`} src={item.menu_image} alt="" />
                            <p className="mt-[10px] cursor-pointer text-[clamp(14px,1.4vw,20px)] text-[#747474] max-[600px]:text-[14px]">{item.menu_name}</p>

                        </div>
                    )
                })
            }
        </div>
        <hr className="my-5 h-[2px] border-0 bg-[#e2e2e2]" />

    </div>
  )
}

export default ExploreMenu