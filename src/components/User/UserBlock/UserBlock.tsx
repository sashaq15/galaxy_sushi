import { useDispatch, useSelector } from "react-redux"
import styles from "./UserBlock.module.scss"
import { Link } from "react-router-dom"
import { getFirstName, userSelector } from "@/store/user/slice"
import { useState } from "react"
import { ButtonRound } from "@/components/Buttons"
import { changeUserFirstName } from "@/service/db-service/user-db"
import { getSession } from "@/service/userSessionStorage/userSessionStorage"
import { userSessionStorage } from "@/service/userSessionStorage"
const UserBlock = () => {
  const { firstName} = useSelector(userSelector);
  const [first_Name, setFirst_Name] = useState(firstName);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const {id} = userSessionStorage.getSession();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirst_Name(e.target.value) 
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(getFirstName(first_Name));
    setIsEditing(false);
    id && changeUserFirstName(first_Name,id);
  }


  return (
    <div className={styles.root}>
      <div className={styles.roundIcon}>{firstName ? firstName[0] : null}</div>
      <div className={styles.nameDiv} onClick={() => setIsEditing(true)}> { isEditing ? (
        <form className={styles.divInput} onSubmit={handleSubmit}>
        <input
          type="text"
          value={first_Name}
          onChange={handleNameChange}
          className={styles.nameInput}
          autoFocus
          maxLength={16}
        >
        </input>
        <ButtonRound children={"✓"} onClick={console.log('цщкл')} variant={"count"} disabled={undefined} type="submit" />
        </form>
        
      ) : (
        <p className={styles.userName}>{firstName}</p>
      
      )}
      </div>

     
      <Link to="account">
        <div className={styles.userTab}>Личный кабинет</div>
      </Link>
      <Link to="orders">
        <div className={styles.userTab}>История заказов</div>
      </Link>
    </div>
  )
}

export { UserBlock }
