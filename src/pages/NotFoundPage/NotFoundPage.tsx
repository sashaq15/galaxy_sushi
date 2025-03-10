import { Header } from "@/components/Header"
import { NotFoundBlock } from "@/components/NotFoundBlock"

const NotFoundPage = () => {
  return (
    <div className="wrapper">
      <Header
        searchValue={""}
        onChangeSearchValue={undefined}
        clearSearchValue={undefined}
      />
      <NotFoundBlock />
    </div>
  )
}

export { NotFoundPage }
