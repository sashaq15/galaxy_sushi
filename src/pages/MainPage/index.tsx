import Header from '../../components/Header';
import Categories, { categories } from '../../components/Categories';
import SushiBlock from '../../components/SushiBlock';
import { useEffect, useRef} from 'react';
import MyLoader from '../../components/MyLoader';
import Pagination from '../../components/Pagination';
import { fetchSushi, sushiSelector, TSushiItem } from '../../redux/sushiSlice';

import {  setCategoryId, setCurrentPage, setSearchValue, clearSearchValue} from '../../redux/sushiSlice';
import { useDispatch, useSelector } from 'react-redux';

import qs from 'qs'
import { useNavigate } from 'react-router';
import CarouselGalaxy from '../../components/Carousel';

const MainPage = () => {

    

    const dispatch = useDispatch();
    const {items,categoriesId, status, currentPage, searchValue} = useSelector(sushiSelector)
    const isMounted = useRef(false);
    const navigate = useNavigate();



    const onChangeCurrentPage = (e:any) => {
        dispatch(setCurrentPage(e))
    }
   
    const onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setSearchValue(e.target.value))
    }

    const clearInputValue = () => {
        dispatch(clearSearchValue(''))
    }

    const onChangeCategoryId = (index:number) => {
      dispatch(setCategoryId(index))
    }

    const search = searchValue ? `search=${searchValue}` : null;
    const getSushi = () => {
        const mainUrl = `https://66a4c8165dc27a3c1909cbe1.mockapi.io/sushi?page=${currentPage}&limit=8&${search}`;
        const url = categoriesId > 0 ? `${mainUrl}&category=${categoriesId}` : mainUrl;
        //@ts-ignore
        dispatch(fetchSushi(url))
    }

    useEffect(() => {
        getSushi();
    }, [categoriesId, currentPage, searchValue]);

    useEffect(() => {
        if(isMounted.current) {
            let queryString;
            if(search) {
                 queryString = qs.stringify( {
                    categoriesId,currentPage, searchValue
                })
            } else {
                queryString = qs.stringify( {
                    categoriesId,currentPage
                })
            }
            navigate(`?${queryString}`)
        }              

        isMounted.current = true;
    },[categoriesId, currentPage, searchValue])

    useEffect(() => {
        dispatch(setCurrentPage(1))
    }, [categoriesId]);


    const sushi = items?.map((item:TSushiItem,index:number) =>  <SushiBlock {...item} key={index}/> )
    const arrMyLoader = [...new Array(8)].map((__,i) => <MyLoader key={i}/>)

    return (
        
        <div className="wrapper">
            <div className="content">

                    <Header searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} clearSearchValue = {clearInputValue}/>
                    <Categories categoriesId={categoriesId} onChangeCategoryId={onChangeCategoryId}  />
         
                <div className="content__bottom">
                
                <CarouselGalaxy/>
                    <div className="container">
                        
                    
                        <h2 className="content__bottom__title">{categories[categoriesId]}</h2>
                            <ul className="content__bottom__items">
                               { status === 'error' ? <div style={{fontSize: '40px', textAlign: 'center'}}>Упс, такого продукта не найдено !</div> : (
                                 status === 'loading' ? arrMyLoader : sushi
                               )}
                            </ul>
                            
                    </div>
                </div>        
          </div>
            { // display pagination ( item.length >= 8)
            items?.length !== undefined && items?.length >= 8 && (
            <Pagination currentPage={currentPage} onChangeCurrentPage ={onChangeCurrentPage}  />   
            )
            }

            { // display pagination ( item.length < 8 && curentPage > 2)
            (items?.length !== undefined && items?.length < 8 && currentPage > 1) && (
            <Pagination currentPage={currentPage} onChangeCurrentPage ={onChangeCurrentPage}  />   
            ) 
            } 


          

        </div>
    )
}

export default MainPage;
