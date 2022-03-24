import { json, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";

export const loader = async () => {
  const githubResponse = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: `
      {
        user(login: "gabrieldocoutos") {
          repositories(first: 100, ownerAffiliations: [OWNER]) {
            edges {
              node {
                id
                name
                url
                description
              }
            }
          }
        }
      }`,
    }),
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const { data } = await githubResponse.json();

  return json({
    posts: await getPosts(),
    repositories: data.user.repositories.edges,
  });
};

export default function Index() {
  const { posts, repositories } =
    useLoaderData<{ posts: Post[]; repositories: any }>();
  return (
    <main className="pt-10 px-4">
      <h1 className="text-5xl text-slate-100 pb-4">hello, i am gabriel.</h1>
      <h2 className="text-slate-100">
        i am software developer from brazil. i am currently working for
        thoughtworks
      </h2>
      <p className="text-slate-100">
        i don't know exactly what i gonna share, but here are a few posts:
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>github repos</p>
      <ul>
        {repositories.map((repository: any) => (
          <li key={repository.node.id}>{repository.node.name}</li>
        ))}
      </ul>
    </main>
  );
}
