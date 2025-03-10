import "./button.scss"

type TButtonProps = {
  children: any
  onClick: any
  variant: string
}

const Button: React.FC<TButtonProps> = ({
  children,
  onClick,
  variant = "primary header"
}) => {
  return (
    <button onClick={onClick} className={`button ${variant} }`}>
      {children}
    </button>
  )
}

export { Button }
