export default function layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main>
      {children}
      <h1>Recomendados</h1>
    </main>
  );
}
