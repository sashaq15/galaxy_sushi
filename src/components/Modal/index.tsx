import {   useNavigate, useParams } from "react-router-dom";
import styles from './modal.module.scss'
import { TSushiItem } from "../../redux/sushi/types";
import { useDispatch, } from "react-redux";
import { useEffect, useState } from "react";
import { addItem} from "../../redux/cart/slice";
import Button from "../Buttons/Button";
import ButtonRound from "../Buttons/ButtonRound";
import { AppDispatch } from "../../redux/store";
import { getSushiFromDBById } from "../../db/userData";


 const Modal:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const id = Number(useParams().id);

  const [item,setItem] = useState<TSushiItem>();
  const [count, setCount] = useState(1);

  useEffect(() => {
    async function  fetchItem() {
        if(id) {
          const  sushiData: any = await getSushiFromDBById(id)
          setItem(sushiData)
        }
    }

    fetchItem();
  }, [])


  const onClickBtnBasket = () => {
    if(item) {
      dispatch(addItem({...item , count})) 
      navigate('/')
    }
   }
  
  return (
    <div className={styles.root}>
        <div className={styles.modalDiv}>
            <div className={styles.modal}>
                <div className={styles.modalContainer}> 
                    <div className={styles.modalImgWrapper} >
                      <img className={styles.modalImg} src={item?.imageUrl} alt="" />
                    </div>
                    <div className={styles.modalDescr}>
                      <div className={styles.modalHeader}>
                        <h2 className={styles.title}>{item?.title}</h2>
                        <ButtonRound onClick={() => navigate(-1)} variant={"closeIcon"}  disabled={null}>x</ButtonRound>
                      </div>
                      <p className="">{item?.weight}</p>
                      <div style={{height: '100px'}}>{item?.descr}
                      </div>
                      <div className={styles.modalFooter} >
                       <div className={styles.footerTitle}>
                          <h3 >Итого</h3>
                          <h3 >{ item?.price ? (item.price * count).toFixed(1) : item?.price} BYN </h3>
                       </div>
                       <div className={styles.footerBtns}>
                          <div className={styles.item__count}>
                            <ButtonRound onClick={() => setCount(count-1)} disabled= {count === 0 ? true: false} variant={"count"}>-</ButtonRound>
                            <h2>{ count  }</h2>
                            <ButtonRound onClick={() => setCount(count + 1)} variant={"count"}  disabled={null}>+</ButtonRound>
                      
                          </div>
                          <Button onClick={() => onClickBtnBasket() } variant={"modal"}> В корзину</Button>
                       </div>
                      </div>
                    </div>

                  
              
                </div>
            </div>
            </div>
    </div>
  );
};

export default Modal
