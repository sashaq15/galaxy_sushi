import { Link } from "react-router-dom"
import basketEmpty from "@/assets/basketEmpty.svg"
import style from "./style.module.scss"
import { Button } from "../Buttons"

const Empty: React.FC = () => {
  return (
    <div className={style.root}>
      <h1>В корзине нет товаров</h1>
      <div className={style.basket}>
        <img src={basketEmpty} alt="" />
      </div>
      <Link to="/">
        <Button onClick={null} variant={"empty"}>
          &#8629; Вернуться назад
        </Button>
      </Link>
    </div>
  )
}

export { Empty }
