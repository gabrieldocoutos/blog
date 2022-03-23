import { json, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";

export const loader = async () => {
  return json(await getPosts());
};

export default function Index() {
  const posts = useLoaderData<Post[]>();
  return (
    <main className="pt-10 px-4">
      <h1 className="text-5xl text-slate-900 pb-4">hello, i am gabriel.</h1>
      <h2>
        i am software developer from brazil. i am currently working for
        thoughtworks
      </h2>
      <p>i don't know exactly what i gonna share, but here are a few posts:</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
