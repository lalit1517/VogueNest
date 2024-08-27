import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import Product from "./Product";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ProductList = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart();
    const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = (
  <>
    {Array.from({ length: 51 }, (_, index) => (
      <div key={index} className="product">
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={30} animation="wave" />
          <Skeleton variant="rectangular" height={325} animation="wave" />
        </Stack>
        <Skeleton
          variant="rectangular"
          height={80}
          animation="wave"
          sx={{ bgcolor: 'grey.500' }}
        />
      </div>
    ))}
  </>
);

    if (products?.length) {
      pageContent = products.map((product) => {
        const inCart: boolean = cart.some((item) => item.sku === product.sku);

        return (
          <Product
            key={product.sku}
            product={product}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
            inCart={inCart}
          />
        );
      });
    }

  const content = (
    <main className="main main--products container container-xl-custom py-20">
      {pageContent}
    </main>
  );

  return content;
};
export default ProductList;
