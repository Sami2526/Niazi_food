import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className="mx-auto my-[80px] text-center text-[clamp(20px,3vw,42px)] font-medium min-[1200px]:my-[100px] max-[600px]:my-[60px] max-[600px]:text-[clamp(18px,5vw,24px)]" id="app-download">
        <p className="mx-auto max-w-[700px] leading-[1.4]">For Better Experience Download <br /> Niazi App </p>
        <div className="mt-[40px] flex flex-wrap justify-center gap-[clamp(20px,2vw,50px)] min-[1200px]:gap-[60px] max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-[15px]">
            <img className="w-[clamp(120px,30vw,200px)] max-w-[200px] cursor-pointer transition duration-500 hover:scale-[1.05] min-[1200px]:w-[180px] min-[1200px]:max-w-[180px] max-[600px]:w-[150px] max-[600px]:max-w-[150px]" src={assets.play_store} alt="" />
            <img className="w-[clamp(120px,30vw,200px)] max-w-[200px] cursor-pointer transition duration-500 hover:scale-[1.05] min-[1200px]:w-[180px] min-[1200px]:max-w-[180px] max-[600px]:w-[150px] max-[600px]:max-w-[150px]" src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload