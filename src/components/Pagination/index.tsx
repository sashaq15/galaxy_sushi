import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import { useSelector } from 'react-redux';
import { sushiSelector } from '../../redux/sushiSlice';
import { useLocation, useParams } from 'react-router';
import qs from 'qs';


type TPagination = {
  currentPage: number,
  onChangeCurrentPage: (page: number) => void;
} 



export const Pagination: React.FC<TPagination> = ({currentPage, onChangeCurrentPage}) => {
  const location = useLocation();
  const parseValues = Object.values(qs.parse(location.search));
  const categoriesId = Number(parseValues[0]);
  
  let pageLimit = 3;

  switch(categoriesId) {
    case 1:
    case 3:
      pageLimit = 2;
      break;
    case 2:
    case 4:
    case 5:
    case 6:
    case 7:
      pageLimit = 1;
      break;
    default: 
          pageLimit = 7;
          break;
  }




  return (
    <div  className={styles.root}>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={pageLimit}
        forcePage={currentPage-1}
        previousLabel="<"
      />
    </div>
  )
}

export default Pagination

