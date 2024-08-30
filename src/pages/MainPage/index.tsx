import Header from '../../components/Header';
import Categories, { categories } from '../../components/Categories';
import SushiBlock from '../../components/SushiBlock';
import { useEffect } from 'react';
import MyLoader from '../../components/MyLoader';
import Pagination from '../../components/Pagination';
import { sushiSelector, TSushiItem } from '../../redux/sushiSlice';

import { getSushi, setCategoryId, setIsLoading, setCurrentPage, setSearchValue, clearSearchValue} from '../../redux/sushiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';



const MainPage = () => {


    const dispatch = useDispatch();
    const {items,categoriesId, isLoading, currentPage, searchValue} = useSelector(sushiSelector)


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

    const search = searchValue ? `search=${searchValue}` : '';

    const mainUrl = `https://66a4c8165dc27a3c1909cbe1.mockapi.io/sushi?page=${currentPage}&limit=8&${search}`;
    const url = categoriesId > 0 ? `${mainUrl}&category=${categoriesId}` : mainUrl;


    useEffect(() => {
        dispatch(setIsLoading(true))
        fetch(url)
                .then(respone =>  respone.json())
                .then(response => {
                    dispatch(getSushi(response))
                    dispatch(setIsLoading(false));
                })       
    }, [categoriesId, currentPage, search]);

 



   /*  const sushi = data?.filter((item, _)=> item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).map((item:TSushiItem,index:number) => <SushiBlock {...item} key={index}/> ) */
    const sushi = items?.map((item:TSushiItem,index:number) =>  <SushiBlock {...item} key={index}/> )

    const arrMyLoader = [...new Array(10)].map((__,i) => <MyLoader key={i}/>)

    return (
        
        <div className="wrapper">


          
            <Header searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} clearSearchValue = {clearInputValue}/>
    
            <div className="content">
                <Categories categoriesId={categoriesId} onChangeCategoryId={onChangeCategoryId}  />
                <div className="content__bottom">
                    <div className="container">
                        <h2 className="content__bottom__title">{categories[categoriesId]}</h2>
                            <ul className="content__bottom__items">
                               {isLoading ? arrMyLoader : sushi}
                             
                               
                            </ul>
                            
                    </div>
                </div>


             
                
          </div>
          <Pagination currentPage={currentPage} onChangeCurrentPage ={onChangeCurrentPage}  />
        </div>
    )
}

export default MainPage;
