import { Header } from "@/components/Header"
import { Categories, categories } from "@/components/Categories"
import { SushiBlock } from "@/components/SushiBlock"
import { useEffect, useRef } from "react"
import { MyLoader } from "@/components/MyLoader"
import { Pagination } from "@/components/Pagination"
import { fetchSushiFirestore, sushiSelector } from "@/store/sushi/slice"
import { TSushiItem } from "@/store/sushi/types"

import {
  setCategoryId,
  setCurrentPage,
  setSearchValue,
  clearSearchValue
} from "@/store/sushi/slice"
import { useDispatch, useSelector } from "react-redux"

import qs from "qs"
import { useNavigate } from "react-router"
import { CarouselGalaxy } from "@components/Carousel"
import { AppDispatch } from "@/store/store"

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, categoriesId, status, currentPage, searchValue } =
    useSelector(sushiSelector)
  const isMounted = useRef(false)
  const navigate = useNavigate()

  const limitValue = 8

  const onChangeCurrentPage = (e: any) => {
    dispatch(setCurrentPage(e))
  }

  const onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    dispatch(setSearchValue(e.target.value))
  }

  const clearInputValue = () => {
    dispatch(clearSearchValue(""))
  }

  const onChangeCategoryId = (index: number) => {
    dispatch(setCategoryId(index))
  }


  const getSushiFirestore = () => {
    const params = {
      categoriesId,
      currentPage,
      limitValue,
      searchValue
    }
    dispatch(fetchSushiFirestore(params))
  }

  useEffect(() => {
    getSushiFirestore()
  }, [categoriesId, currentPage, searchValue])


  useEffect(() => {
    if (isMounted.current) {
      let queryString
      //был search вместо searchValue
      if (searchValue) {
        queryString = qs.stringify({
          categoriesId,
          currentPage,
          searchValue
        })
      } else {
        queryString = qs.stringify({
          categoriesId,
          currentPage
        })
      }
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoriesId, currentPage, searchValue])

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [categoriesId])

  const searchFilterValue = searchValue ? searchValue : ""

  const sushi = items
    ?.filter((item: TSushiItem) =>
      item.title.toLowerCase().includes(searchFilterValue.toLowerCase())
    )
    .map((item: TSushiItem, index: number) => (
      <SushiBlock {...item} key={index} />
    ))
  const arrMyLoader = [...new Array(8)].map((__, i) => <MyLoader key={i} />)

  return (
    <div className="wrapper">
      <div className="content">
        <Header
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          clearSearchValue={clearInputValue}
        />
        <Categories
          categoriesId={categoriesId}
          onChangeCategoryId={onChangeCategoryId}
        />

        <div className="content__bottom">
          <CarouselGalaxy />
          <div className="container">
            <h2 className="content__bottom__title">
              {categories[categoriesId]}
            </h2>
            <ul className="content__bottom__items">
              {status === "error" ? (
                <div style={{ fontSize: "40px", textAlign: "center" }}>
                  Упс, такого продукта не найдено !
                </div>
              ) : status === "loading" ? (
                arrMyLoader
              ) : (
                sushi
              )}
            </ul>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        onChangeCurrentPage={onChangeCurrentPage}
      />
    </div>
  )
}

export { MainPage }
