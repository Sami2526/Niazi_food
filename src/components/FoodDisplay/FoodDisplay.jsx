import { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from "../../context/StoreContext"
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, setCategory, searchTerm = "" }) => {
    const { food_list } = useContext(StoreContext)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedFoodId, setSelectedFoodId] = useState(null)
    const relatedFoodsRef = useRef(null)

    const normalizeCategoryValue = value => {
        const normalized = String(value ?? "").trim().toLowerCase()
        const aliases = {
            desert: "deserts",
            desserts: "deserts",
            desrt: "deserts",
        }
        return aliases[normalized] ?? normalized
    }

    const normalizeText = value => normalizeCategoryValue(value)
    const matchesCategory = (item, selected) => !selected || selected === "All" || normalizeText(item.category) === normalizeText(selected)
    const activeCategory = searchTerm.trim() ? "All" : category

    const matchesSearch = item => {
        const query = normalizeText(searchTerm)
        if (!query) return true

        const searchableValues = [item.name, item.description, item.category]
        return searchableValues.some(value => normalizeText(value).includes(query))
    }

    const visibleFoods = food_list.filter(item => matchesCategory(item, activeCategory) && matchesSearch(item))
    const relatedFoods = selectedCategory
        ? food_list.filter(item => item._id !== selectedFoodId && matchesCategory(item, selectedCategory) && matchesSearch(item))
        : []

    useEffect(() => {
        if (selectedFoodId && relatedFoodsRef.current) {
            relatedFoodsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [selectedFoodId, selectedCategory])

    const renderFood = item => (
        <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            onSelect={() => {
                setSelectedFoodId(item._id)
                setSelectedCategory(item.category)
            }}
        />
    )

    return (
        <div className="mt-[30px] rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" id="food_display">

            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-[clamp(24px,2.5vw,42px)] font-semibold text-[#333] min-[1200px]:text-[40px] max-[750px]:text-[clamp(20px,4vw,30px)]">
                    {activeCategory !== "All" ? `${activeCategory} Menu` : "Popular Picks Near You"}
                </h2>
                {activeCategory !== "All" && !searchTerm.trim() && (
                    <button
                        type="button"
                        onClick={() => setCategory("All")}
                        className="cursor-pointer rounded-full border border-[tomato] px-4 py-2 text-sm font-medium text-[tomato] transition hover:bg-[tomato] hover:text-white"
                    >
                        Back to all menu
                    </button>
                )}
            </div>
            {searchTerm && <p>Search results for: {searchTerm}</p>}
            <div className="food-display-list !mt-[30px] !grid !grid-cols-[repeat(auto-fill,minmax(240px,1fr))] !gap-[30px] !gap-y-[50px] min-[1200px]:!grid-cols-[repeat(auto-fill,minmax(260px,1fr))] min-[1200px]:!gap-[40px] min-[1200px]:!gap-y-[60px] min-[1600px]:!grid-cols-[repeat(auto-fill,minmax(280px,1fr))] min-[1600px]:!gap-[50px] min-[1600px]:!gap-y-[70px] min-[1600px]:!mx-auto min-[1600px]:!max-w-[1400px] max-[1050px]:!grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-[1050px]:!gap-[25px] max-[1050px]:!gap-y-[40px] max-[750px]:!grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-[750px]:!gap-5 max-[750px]:!gap-y-[35px] max-[480px]:!grid-cols-2 max-[480px]:!gap-[15px] max-[480px]:!gap-y-[25px]">
                {visibleFoods.map(renderFood)}
            </div>
            {visibleFoods.length === 0 && (
                <p className="mt-6 text-[#676767]">No food found for your search.</p>
            )}
            {selectedCategory && relatedFoods.length > 0 && (
                <section ref={relatedFoodsRef} className="mt-[70px] scroll-mt-6" aria-labelledby="related-foods-heading">
                    <h2 className="text-[clamp(24px,2.5vw,42px)] font-semibold text-[#333] min-[1200px]:text-[40px] max-[750px]:text-[clamp(20px,4vw,30px)]" id="related-foods-heading">More {selectedCategory} options</h2>
                    <div className="food-display-list !mt-[30px] !grid !grid-cols-[repeat(auto-fill,minmax(240px,1fr))] !gap-[30px] !gap-y-[50px] min-[1200px]:!grid-cols-[repeat(auto-fill,minmax(260px,1fr))] min-[1200px]:!gap-[40px] min-[1200px]:!gap-y-[60px] min-[1600px]:!grid-cols-[repeat(auto-fill,minmax(280px,1fr))] min-[1600px]:!gap-[50px] min-[1600px]:!gap-y-[70px] min-[1600px]:!mx-auto min-[1600px]:!max-w-[1400px] max-[1050px]:!grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-[1050px]:!gap-[25px] max-[1050px]:!gap-y-[40px] max-[750px]:!grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-[750px]:!gap-5 max-[750px]:!gap-y-[35px] max-[480px]:!grid-cols-2 max-[480px]:!gap-[15px] max-[480px]:!gap-y-[25px]">
                        {relatedFoods.map(renderFood)}
                    </div>
                </section>
            )}
        </div>
    )
}

export default FoodDisplay