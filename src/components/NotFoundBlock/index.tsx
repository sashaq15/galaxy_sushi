import { Link } from 'react-router-dom';
import styles from './NotFoundBlock.module.scss'
import Header from '../Header';
const NotFoundBlock = () => {
    return (
   
        <div className={styles.root}>
             <h1 > Упс!По вашему запросу ничего не нашлось &#9785;</h1>
             <Link to="/">
                <button >&#8629; На главную</button>
                </Link>
        </div>
     
    )
}


export default NotFoundBlock;