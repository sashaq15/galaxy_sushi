import { Link } from 'react-router-dom';
import styles from './headerUserPage.module.scss';
import logoSvg from '../../../assets/logo.svg'
import { UserLogo } from '../UserLogo';


 const HeaderUserPage = ({first_Name}:any) => {
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
                <UserLogo first_Name={first_Name}/>
                </div>
              </div>

            </div>
    </div>
      
  )
}

export default HeaderUserPage;