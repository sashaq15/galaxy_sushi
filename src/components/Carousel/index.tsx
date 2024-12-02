import React, { useState } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import styles from './carousel.module.scss'
const CarouselGalaxy:React.FC = () => {

  const slides = ['https://cdn.cleverone.tech/d/Rz/3F/OsmmRF4uRzetatLokne2jAjiDA30.jpg?o=1',
    'https://cdn.cleverone.tech/d/ts/FH/kN42LiQgR8g3tz4pLz0IxXc8Ut30.webp?o=1',
    'https://elementy.ru/images/kartinka_dnya/potd_sombrero_galaxy_1.jpg']

  const [slide,setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides.length-1 ? 0 : slide +1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length-1 : slide-1)
  }

  return (
    <div className={styles.root}>
      <BsArrowLeftCircleFill onClick={prevSlide} className={`${styles.arrow} ${styles.arrowLeft}`}/>
      {slides.map((item:string,index:number) => {
        return <img src={item} alt="" key={index} className={index === slide ? styles.slide : styles.slideInactive} />
      })}
      <BsArrowRightCircleFill onClick={nextSlide} className={`${styles.arrow} ${styles.arrowRight}`}/>

      <span className={styles.indicators}>
        {slides.map((_:any,index:number) => {
          return <button 
                    onClick={() => setSlide(index)}
                    key={index} 
                    className={slide === index ? styles.indicator : `${styles.indicator} ${styles.indicatorInactive}`}
                    >
                </button>
        })}
      </span>

      </div>
  )
}

export default CarouselGalaxy;