const Header = () => {
    const handleViewMenu = () => {
        document.getElementById("explore-menu")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="relative mx-auto my-[clamp(20px,3vw,40px)] h-[clamp(300px,32vw,520px)] overflow-hidden rounded-[20px] bg-[url('/header_imege.jpg')] bg-cover bg-center min-[1600px]:rounded-3xl max-[750px]:h-[clamp(280px,52vw,380px)] max-[480px]:my-5 max-[480px]:h-[300px] max-[480px]:rounded-xl">
            <div className="absolute bottom-[10%] left-[clamp(24px,5vw,80px)] flex w-[min(720px,72%)] animate-[fedeIn_3s] flex-col items-start gap-[clamp(10px,1.5vw,22px)] min-[1200px]:w-[min(720px,65%)] max-[1050px]:w-[min(620px,72%)] max-[750px]:bottom-[7%] max-[750px]:left-[6%] max-[750px]:w-[min(560px,88%)] max-[480px]:bottom-[6%] max-[480px]:left-[5%] max-[480px]:w-[90%] max-[480px]:gap-[10px]">
                <h2 className="text-[clamp(30px,4vw,64px)] leading-[1.2] font-medium text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] max-[750px]:text-[clamp(20px,5vw,32px)] max-[480px]:text-[clamp(21px,6vw,28px)] max-[480px]:leading-[1.1]">
                    Discover & Order Your Favorite Food
                </h2>
                <p className="max-w-[620px] text-[clamp(15px,1.2vw,20px)] leading-[1.5] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.3)] max-[1050px]:text-[clamp(14px,1.6vw,17px)] max-[750px]:max-w-full max-[750px]:text-[clamp(14px,2.2vw,16px)] max-[480px]:text-[14px] max-[480px]:leading-[1.4]">
                    Explore a diverse menu of delicious dishes made with the finest ingredients. Satisfy your cravings and enjoy a delightful dining experience, one delicious meal at a time.
                </p>
                <button onClick={handleViewMenu} className="cursor-pointer rounded-full border-0 bg-white px-[clamp(20px,2.3vw,50px)] py-[clamp(10px,1vw,20px)] text-[clamp(14px,1vw,22px)] font-medium whitespace-nowrap text-[#747474] transition duration-300 hover:scale-[1.02] hover:bg-[#f0f0f0] min-[1200px]:px-12 min-[1200px]:py-4 min-[1200px]:text-[20px] max-[750px]:px-[22px] max-[750px]:py-[10px] max-[750px]:text-[14px] max-[480px]:px-[18px] max-[480px]:py-[9px] max-[480px]:text-[13px]">
                    View Menu
                </button>
            </div>

        </div>
    )
}

export default Header