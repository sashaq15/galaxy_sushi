
export const categories = ['Все позиции', 'Суши сеты','Авторские роллы' , 'Роллы', 'Суши и гунканы', 'Тёплые роллы', 'Закуски', 'Лапша и Рис' ]


const Categories = ({categoriesId, onChangeCategoryId} : any) => {

    
    const activeClass = 'content__top__category__item content__top__category__item__active';
    const defaultClass = 'content__top__category__item';

    return (
        <div className="content__top">
    
          <ul className="content__top__category ">

            { categories.map((item:string, index:number) => 
                <li 
                onClick={() => onChangeCategoryId(index)}  
                className= {categoriesId === index ? activeClass : defaultClass }
                key={index}>
                  {item}
                </li>
            )}
            


          </ul>
   
      </div>
    )
}

export default Categories;