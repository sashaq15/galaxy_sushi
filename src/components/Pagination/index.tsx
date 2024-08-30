import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


type TPagination = {
  currentPage: number,
  onChangeCurrentPage: (page: number) => void;
} 

export const Pagination: React.FC<TPagination> = ({currentPage, onChangeCurrentPage}) => {
  return (
    <div  className={styles.root}>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={5}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </div>
  )
}

export default Pagination