import React from 'react'
import './buttonRound.scss'

type TButtonRound = {
    children: any,
    onClick: any;
    variant: string;
    disabled: any
}

const buttonRound:React.FC<TButtonRound> = ({children, onClick,  variant, disabled}) => {
  return (
    <button className={`buttonRound ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default buttonRound;