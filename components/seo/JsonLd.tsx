// Renders one or more schema.org JSON-LD blocks. Plain server component —
// the data always comes from our own trusted builders in lib/seo.ts, never
// from user input, so serializing straight into a script tag is safe here.
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-danger
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
