import React from "react"
import styles from "./ErrorPopup.module.scss"
import errorPopupSVg from "@/assets/errorPopup.svg"

interface MyComponentProps {
  children: React.ReactNode
}

const ErrorPopup: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.error}>{children}</div>
      <div className={styles.errorPosRel}>
        <img src={errorPopupSVg} alt="" />
      </div>
    </div>
  )
}

export { ErrorPopup }
