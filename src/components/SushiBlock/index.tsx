import { Link, useLocation } from 'react-router-dom';
import basketSvg from '../../assets/basket.svg'
import { TSushiItem } from '../../redux/sushiSlice';


const SushiBlock:React.FC<TSushiItem> = ({ 
  id,
  imageUrl,
  title,
  weight,
  price,
  category,
  })  => {

    const location = useLocation();


    return (

      <Link to={`modal/${id}`} state={{ background: location }}> 
        <li  className="content__bottom__item">
            <img src={imageUrl} className="content__bottom__item__img"></img>

        <div className="content__bottom__item__descr">
          <span className="content__bottom__item__title">{title}</span>
          <span className="content__bottom__item__weight">{weight}</span>
          <div className="content__bottom__item__buy">
            <span className="content__bottom__item__buy__price">{price} BYN</span>
            <img src={basketSvg} className="content__bottom__item__buy__basket"></img>
            </div> 
          </div>
      </li>
    </Link>  



    )
    


}

export default SushiBlock;