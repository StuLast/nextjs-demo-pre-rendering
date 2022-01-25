import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link'

function HomePage(props) {

  const { products } = props
  return (
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export const getStaticProps = async (context) => {

  const fileName = 'dummy-backend.json'
  const filePath = path.join(process.cwd(), 'data', fileName);
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
  }
}

export default HomePage;