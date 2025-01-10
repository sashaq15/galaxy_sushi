export enum status {
    LOADING = 'loading',
    SUCCSEC = 'succses',
    ERROR = 'error'
  }

export type TSushiItem = {
    id: string,
    imageUrl: string,
    title: string,
    weight: string,
    price: number,
    category: number,
    descr: string,
    count: number
  }
  
export type ISushiSlice = {
    items : TSushiItem[] | null,
    searchValue: string | null,
    categoriesId: number,
    currentPage: number,
    isLoading: boolean,
    status: status
  }

  export type FetchSushiArgs = {
    categoriesId: number;
    currentPage: number;
    limitValue: number;
  }