interface CategoryProps {
  params: {
    category: string;
  };
}

export default function page(props: CategoryProps): JSX.Element {
  const { category } = props.params;

  return <h1>Category: {category}</h1>;
}
