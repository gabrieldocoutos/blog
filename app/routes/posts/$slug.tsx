import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost } from "~/post";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return json(await getPost(params.slug));
};

export default function PostSlug() {
  const post = useLoaderData();
  useEffect(() => {
    window.Prism.highlightAll();
  }, []);
  return (
    <>
      <main
        className="prose prose-slate"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </>
  );
}
