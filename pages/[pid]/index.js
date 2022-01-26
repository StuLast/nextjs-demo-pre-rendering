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

export const getStaticPaths = async () => {

  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;

  const fileName = 'dummy-backend.json'
  const filePath = path.join(process.cwd(), 'data', fileName);
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find(product => product.id === productId);

  return {
    props: {
      product
    },
    revalidate: 10
  }

}

export default ProductDetailPage