import { useDispatch } from "react-redux"
import { addOneItem, deleteItem, deleteOneItem } from "@/store/cart/slice"
import { TSushiItem } from "@/store/sushi/types"
import styles from "./CartItem.module.scss"
import { ButtonRound } from "../Buttons"

const CartItem: React.FC<TSushiItem> = ({ ...props }) => {
  const { imageUrl, title, weight, price, count, id } = props
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <div className={styles.item__row}>
        <div className={styles.item__block}>
          <img src={imageUrl} alt="" className="item__icon" />
          <div className={styles.item__descr}>
            <h2 className={styles.item__name}>{title}</h2>
            <p className={styles.item__weight}>{weight}</p>
          </div>
        </div>

        <div className={styles.item__count}>
          <button
            onClick={() => dispatch(deleteOneItem({ ...props }))}
            className={styles.count__btn}
            disabled={count === 1 ? true : false}
          >
            -
          </button>
          <h2>{count}</h2>
          <button
            onClick={() => dispatch(addOneItem({ ...props }))}
            className={styles.count__btn}
          >
            +
          </button>
        </div>

        <div className="item__price">
          <h2 className={styles.totalPrice}>
            {count ? (price * count).toFixed(1) : null} BYN
          </h2>
        </div>
        <ButtonRound
          onClick={() => dispatch(deleteItem({ ...props }))}
          variant={"clear"}
          disabled={null}
        >
          x
        </ButtonRound>
      </div>
    </div>
  )
}

export { CartItem }
