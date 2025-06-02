import { createPortal } from "react-dom"
import {AnimatePresence, motion} from 'framer-motion'
import styles from './ModalPortal.module.scss'

type TModalPortal = {
  isVisible : boolean,
  children?: React.ReactNode,
  onClose: () => void
}

const ModalPortal = ({isVisible, children, onClose}:TModalPortal) => {
  return  createPortal(
    <AnimatePresence>
       {isVisible && <div className={styles.root}>
        <motion.div className={styles.overlay} 
          onClick={() => 
            onClose()
          }
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3 }
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          >
          <motion.div 
            className={styles.modalContainer}
            initial={{
              opacity: 0,
              y: 100
            }}
            animate={{
              opacity: 1,
              y:0,
              transition: {duration: 0.3}
            }}
            exit={{
              opacity: 0,
              y: 100,
              transition: {duration: 0.3}
            }}>
         
            <div className={styles.modal} onClick={(e) => 
            e.stopPropagation()}
            >{children}</div>
          </motion.div>
        </motion.div>
      </div>}
    </AnimatePresence>,
    document.body
  )
 
}

export {ModalPortal}