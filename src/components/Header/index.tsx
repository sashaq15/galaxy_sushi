import logoSvg from '../../assets/logo.svg'
import basketSvg from '../../assets/basket.svg';
import searchSvg from '../../assets/search.svg'
import { Link } from 'react-router-dom';
import styles from './header.module.scss'
import Search from '../Search';

export interface ISearchProps {
  searchValue: string;
  onChangeSearchValue: any;
  clearSearchValue: any;
}


const Header : React.FC<ISearchProps> = ({searchValue,onChangeSearchValue, clearSearchValue}) => {
  
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
                    <button>
                      <span className={styles.header__cart__price}>0$</span>
                      <img src= {basketSvg} className={styles.header__cart__icon}></img>
                      <span className={styles.header__cart__count} >12</span>
                    </button>
                  </Link>
                </div>
              </div>

            </div>
        </div>
       </div>
    )
}

export default Header;