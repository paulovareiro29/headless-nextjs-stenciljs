import Components from "@/components";
import { convertBlocksToComponents } from "@/services/components";
import { fetchPageBySlug, fetchPages } from "@/services/strapi";
import Head from "next/head";
import React from "react";

interface Props {
  slug: any;
  data: any;
}

interface Component {
  id: number;
  component: string;
  props: Record<any, any>;
}

export default function Page({ data }: Props) {
  const blocks = convertBlocksToComponents(data.blocks);

  return (
    <div>
      <Head>
        <script type="module" src="http://127.0.0.1:3333/dist/stencil-component-library/stencil-component-library.esm.js" />
      </Head>
      {blocks.map((block: Component) =>
        React.createElement(Components[block.component], {
          ...block.props,
          key: block.id,
        })
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const pages = await fetchPages();

  const paths = pages.map((page: any) => {
    const slug = page.attributes.slug;

    if (slug === "homepage") return "/";
    return `/${slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const slug = params.slug ? params.slug.join("/") : "homepage";
  const page = await fetchPageBySlug(slug);

  console.log(page);

  return {
    props: {
      data: page,
    },
  };
}
