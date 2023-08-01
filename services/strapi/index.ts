export function getStrapiURL(path: string) {
  return `${process.env.API_URL || "http://127.0.0.1:1337/api"}${path}`;
}

export async function fetchPages() {
  const res = await fetch(getStrapiURL("/pages"));
  const pages = await res.json();

  return pages.data;
}

export async function fetchPageBySlug(slug: string) {
  const res = await fetch(
    getStrapiURL(`/pages?filters[slug][$eq]=${slug}&populate=deep`)
  );
  const json = await res.json();

  return json.data[0]?.attributes;
}
