import  { useEffect, useRef, useState } from 'react'
import styles from './userLogo.module.scss'
import DropdownMenu from '../../DropdownMenu';

export  const UserLogo = ({first_Name}:any) => {

  const firstName = first_Name;
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdownMenu = () => {
      setIsOpenMenu(!isOpenMenu);
      if(isOpenMenu === true) {
        console.log('выпадающее меню открыто')
      } else console.log('выпадающее меню закрыто')
  }

  const handleClickOutside = (e:any) => {
    if(menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpenMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  return (
        <div  className={styles.root}>

            {isOpenMenu &&  <div ref={menuRef} className={styles.dropdownMenu}>
                 <DropdownMenu/>
            </div>
}
           
          <div className={styles.roundIcon} onClick={() => toggleDropdownMenu()}>{ firstName? firstName[0] :null}</div>
        </div>
     
  )
}
