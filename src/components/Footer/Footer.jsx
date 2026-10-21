import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className="mt-[100px] flex flex-col items-center gap-5 bg-[#323232] px-[8vw] pt-[60px] pb-[30px] text-[#d9d9d9] min-[1200px]:px-0 min-[1200px]:pt-[80px] max-[1050px]:px-[6vw] max-[1050px]:pt-[50px] max-[750px]:mt-[60px] max-[750px]:px-[5vw] max-[750px]:pt-[40px] max-[750px]:pb-5 max-[480px]:mt-[40px] max-[480px]:gap-3 max-[480px]:px-[5vw] max-[480px]:pt-7 max-[480px]:pb-4" id="footer">
            <div className="mx-auto w-full max-w-[1400px] min-w-0">
                <div className="grid w-full min-w-0 grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(24px,5vw,80px)] min-[1200px]:gap-[100px] max-[1050px]:gap-8 max-[750px]:grid-cols-1 max-[750px]:gap-[35px] max-[480px]:gap-[22px]">
                    <div className="flex min-w-0 flex-col items-start gap-5 text-inherit max-[750px]:w-full max-[750px]:items-center max-[750px]:gap-5 max-[750px]:text-center max-[480px]:gap-3">
                        <img
                            src={assets.niazi_logo_png}
                            alt="Niazi Food Logo"
                            className="w-[160px] bg-transparent"
                        />
                        <p className="max-w-[420px] leading-[1.7] [overflow-wrap:anywhere] max-[750px]:max-w-full">
                            Niazi Food is your destination for delicious food and a great dining
                            experience. Explore your favourite dishes, order with ease, and enjoy
                            fresh and tasty meals delivered right to your doorstep.
                        </p>
                        <div className="flex max-w-full flex-wrap items-center gap-[14px] max-[750px]:justify-center max-[750px]:gap-4">
                            <img className="h-auto w-[clamp(32px,8vw,40px)] shrink-0 cursor-pointer transition duration-200 hover:scale-110 min-[1200px]:mr-5 min-[1200px]:w-12 max-[750px]:w-[30px]" src={assets.facebook_icon} alt="Facebook" />
                            <img className="h-auto w-[clamp(32px,8vw,40px)] shrink-0 cursor-pointer transition duration-200 hover:scale-110 min-[1200px]:mr-5 min-[1200px]:w-12 max-[750px]:w-[30px]" src={assets.twitter_icon} alt="Twitter" />
                            <img className="h-auto w-[clamp(32px,8vw,40px)] shrink-0 cursor-pointer transition duration-200 hover:scale-110 min-[1200px]:mr-5 min-[1200px]:w-12 max-[750px]:w-[30px]" src={assets.linkedin_icon} alt="LinkedIn" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col items-start gap-5 text-inherit max-[750px]:w-full max-[750px]:items-center max-[750px]:gap-5 max-[750px]:text-center max-[480px]:gap-3">
                        <h2 className="text-[clamp(18px,1.5vw,26px)] text-white">COMPANY</h2>
                        <ul className="m-0 w-full p-0">
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]"><a href="/">Home</a></li>
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]"><a href="#">About Us</a></li>
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]"><a href="#">Delivery</a></li>
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]"><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="flex min-w-0 flex-col items-start gap-5 text-inherit max-[750px]:w-full max-[750px]:items-center max-[750px]:gap-5 max-[750px]:text-center max-[480px]:gap-3">
                        <h2 className="text-[clamp(18px,1.5vw,26px)] text-white">Get In Touch</h2>
                        <ul className="m-0 w-full min-w-0 p-0">
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] [overflow-wrap:anywhere] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]">+92 301 2526578</li>
                            <li className="mb-[10px] list-none cursor-pointer transition duration-200 hover:text-[tomato] [overflow-wrap:anywhere] min-[1200px]:mb-[14px] min-[1200px]:text-[18px]">sami262578@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-5 h-[2px] w-full border-0 bg-[gray] max-[480px]:my-[10px]" />
                <p className="w-full text-center text-[14px] leading-relaxed [overflow-wrap:anywhere] min-[1200px]:text-[16px] max-[750px]:text-xs">Â© 2026 Niazi.com â€” All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
