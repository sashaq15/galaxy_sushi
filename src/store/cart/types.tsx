import { TSushiItem } from "../sushi/types"

export type ICartSlice = {
  itemsCart: TSushiItem[]
  totalPrice: number
  totalItems: number
}
