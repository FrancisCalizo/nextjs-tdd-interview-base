import { Layout, Link, Page, Text } from '@vercel/examples-ui';
import { useBrand } from '@hooks/useBrand';
import { useProducts } from '@hooks/useProducts';
import { Product } from '@hooks/useProducts';

import Thumbnail from 'components/Thumbnail';

type Props = {
  color: string;
};

export default function Home({ color }: Props) {
  const brand = useBrand();
  const { data: { products } = { products: [] }, error } = useProducts();

  console.log(brand);
  return (
    <Page>
      <Text variant="h2" className="mb-6" style={{ color }}>
        Home page
      </Text>
      <Text className="text-lg mb-4">
        <Link href="/about">About</Link> us
      </Text>
      <Text className="text-lg mb-4">
        Welcome to <b>brand {brand.toUpperCase()}</b>{' '}
        {error
          ? error.message
          : products.map((product: Product) => (
              <Link key={product.id} href={`/${brand}/${product.id}`}>
                <Thumbnail product={product} />
              </Link>
            ))}
        .
      </Text>
    </Page>
  );
}

Home.Layout = Layout;

export async function getServerSideProps() {
  return {
    props: {
      product: 'flooring',
      color: '#BB8141',
    },
  };
}
