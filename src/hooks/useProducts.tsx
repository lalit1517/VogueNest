import { useContext } from "react"
import ProductsContext from "../context/ProductsProvider"
import { UseProductsContextType } from "../context/ProductsProvider"

const useProducts = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts

//xIMrIPxAiRRW1xh9AMjVZizU

//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