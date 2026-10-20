import { useContext, useEffect, useRef, useState } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from "../../context/StoreContext"
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, searchTerm = "" }) => {
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
        <div className='food_display' id='food_display'>

            <h2>Popular Picks Near You</h2>
            {searchTerm && <p className="food-display-search">Search results for: {searchTerm}</p>}
            <div className="food-display-list">
                {visibleFoods.map(renderFood)}
            </div>
            {visibleFoods.length === 0 && (
                <p className="food-display-empty">No food found for your search.</p>
            )}
            {selectedCategory && relatedFoods.length > 0 && (
                <section ref={relatedFoodsRef} className="related-foods" aria-labelledby="related-foods-heading">
                    <h2 id="related-foods-heading">More {selectedCategory} options</h2>
                    <div className="food-display-list">
                        {relatedFoods.map(renderFood)}
                    </div>
                </section>
            )}
        </div>
    )
}

export default FoodDisplay