import { Fragment } from "react"
import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {
  const { product } = props;

  if (!product) {
    return (
      <Fragment>
        Loading ...
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getProductData = async () => {
  const fileName = 'dummy-backend.json'
  const filePath = path.join(process.cwd(), 'data', fileName);
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export const getStaticPaths = async () => {
  const data = await getProductData();

  const paths = data.products
    .filter((_, key) => key < 6)
    .map(product => ({ params: { pid: product.id } }));

  return {
    paths,
    fallback: true,  //shows "loading... until data is recovered.  use 'blocking' to hold back serving page until data is processed"
  }
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;
  const data = await getProductData();

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return {
      notFound: true,
      revalidate: 10
    }
  }

  return {
    props: {
      product
    },
    revalidate: 10
  }
}

export default ProductDetailPage;