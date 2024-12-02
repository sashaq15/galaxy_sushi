import { Link } from 'react-router-dom';
import styles from './NotFoundBlock.module.scss'
import Button from '../Buttons/Button';
const NotFoundBlock = () => {
    return (
   
        <div className={styles.root}>
             <h1 > Упс!По вашему запросу ничего не нашлось &#9785;</h1>
             <Link to="/">
                <Button onClick={null} variant='primary'>&#8629; На главную </Button>
                </Link>
        </div>
     
    )
}


export default NotFoundBlock;