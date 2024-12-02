import logoSvg from '../../assets/logo.svg'
import basketSvg from '../../assets/basket.svg';
import { Link } from 'react-router-dom';
import styles from './header.module.scss'
import Search from '../Search';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../redux/cartSlice';
import Button from '../Buttons/Button';

export interface ISearchProps {
  searchValue: string | null;
  onChangeSearchValue: any;
  clearSearchValue: any;
}


const Header : React.FC<ISearchProps> = ({searchValue,onChangeSearchValue, clearSearchValue}) => {

  const {totalPrice, totalItems} = useSelector(cartSelector);
  
    return (
       <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.container}>
              <div className={styles.header__content}>
                <Link  className={styles.header__logo} to="/">
                  <img src={logoSvg} className={styles.header__logo__icon}/>
                  <div className={styles.header__logo__descr}>
                    <h1 className={styles.header__logo__descr__title}>Галактика Суши</h1>
                    <p className={styles.header__logo__descr__text}>Лучшие суши в галактике!</p>

                  </div>
                </Link>
                <Search searchValue = {searchValue} onChangeSearchValue = {onChangeSearchValue} clearSearchValue={clearSearchValue}/>
                <div className={styles.header__cart}>
                  <Link to='/cart'>
                    <Button onClick={null} variant='header' >
                      <span className={styles.header__cart__price}>{totalPrice.toFixed(1)} BYN</span>
                      <img src= {basketSvg} className={styles.header__cart__icon}></img>
                      <span className={styles.header__cart__count} >{totalItems}</span>
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
        </div>
       </div>
    )
}

export default Header;