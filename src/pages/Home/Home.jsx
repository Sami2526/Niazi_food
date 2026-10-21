import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { menu_list } from '../../assets/assets'

const Home = ({ searchTerm }) => {
  const [category, setCategory] = useState("All")
  const hasMounted = useRef(false)

  const normalizeCategoryLookup = value => {
    const normalized = String(value ?? '').trim().toLowerCase()
    const aliases = {
      desert: 'deserts',
      desserts: 'deserts',
      desssert: 'deserts',
      desserts: 'deserts',
      desrt: 'deserts',
    }
    return aliases[normalized] ?? normalized
  }

  useEffect(() => {
    const query = searchTerm.trim()
    if (!query) return

    const matchedCategory = menu_list.find(item => {
      const menuName = normalizeCategoryLookup(item.menu_name)
      const searchValue = normalizeCategoryLookup(query)
      return menuName === searchValue || menuName.includes(searchValue) || searchValue.includes(menuName)
    })

    if (matchedCategory) {
      setCategory(matchedCategory.menu_name)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    document.getElementById('food_display')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [category, searchTerm])

  return (
    <div>
      <Header/>
      <ExploreMenu  category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} setCategory={setCategory} searchTerm={searchTerm} />
      <AppDownload/>
      
    </div>
  )
}

export default Home