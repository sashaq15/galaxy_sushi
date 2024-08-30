import {  useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './modal.module.scss'


 const Modal:React.FC = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

 console.log(location);


  return (
    <div className={styles.root}>
        <div className={styles.modalDiv}>
            <div className={styles.modal}>
                <h3>Modal </h3>
                <button onClick={() => navigate(-1)}>Close</button>
            </div>
            </div>
    </div>
  );
};

export default Modal