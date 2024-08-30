import styles from './cartItem.module.scss'

const CartItem = () => {
    return (
        <div className={styles.root}>
            <div className={styles.item__row}>
                <div className={styles.item__block}>
                    <img src="https://cdn.cleverone.tech/d/v6/Up/DHb5YEQv9ACZzSZhv3D3Dnm8DA30.jpg?w=300&h=300" alt="" className="item__icon" />
                    <div className={styles.item__descr}>
                        <h2 className={styles.item__name}>Суши</h2>
                        <p className={styles.item__weight}>25г</p>
                    </div>
                </div>

                <div className={styles.item__count}>
                    <button className={styles.count__btn}>-</button>
                    <h2>3</h2>
                    <button className={styles.count__btn}>+</button>
                </div>

                <div className="item__price">
                    <h2>450</h2>
                </div>

                <button className={styles.clear__item}>х</button>
                
            </div>
        </div>
    )
}

export default CartItem;