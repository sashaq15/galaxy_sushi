import { useCallback, useEffect, useRef, useState } from 'react';
import searchSvg from '../../assets/search.svg';
import { ISearchProps } from '../Header';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, sushiSelector } from '../../redux/sushiSlice';
import debounce from 'debounce';
import ButtonRound from '../Buttons/ButtonRound';

const Search: React.FC<ISearchProps> = () => {

    const dispatch = useDispatch();

    const {categoriesId} = useSelector(sushiSelector)

    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const updateSearchValue = useCallback(
        debounce((str:string) => {
          dispatch(setSearchValue(str))
        }, 1500), 
        []
      ) 
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value);;
    }

    const clearSearchValue = () => {
        dispatch(setSearchValue(''));
        setValue('');
        if(inputRef.current) {
            inputRef.current.focus()
        }
    }

    useEffect(() => {
        dispatch(setSearchValue(''));
        setValue('');
    }, [categoriesId]); 

    return (
        <div className={styles.root}>
            <div className={styles.header__search}>
                <img src={searchSvg} className={styles.header__search__icon}></img>
                <input 
                      type="text" 
                      placeholder='Поиск продукта' 
                      className={styles.header__search__input}
                      value = {value}
                      name={value}
                      onChange={onChangeInput}
                      ref ={inputRef}/>

                    {value.length > 0 && <ButtonRound  onClick={clearSearchValue} variant={'clearSearch'} disabled={null}>x</ButtonRound> }  
                </div>
        </div>
    )
}


export default Search;

