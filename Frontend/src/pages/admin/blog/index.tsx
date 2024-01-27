/* eslint-disable @next/next/no-img-element */
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { fetchBlog } from "@/services/blog/blog.service";
import { useRouter } from "next/router";

export default function ForumAdmin() {
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetchBlog();
      setPosts(result);
    };
    fetchPosts();
  }, []);

  // handleClick
  const handleClick = (slug: string, id: number) => {
    router.push(
      { pathname: `/admin/blog/articles/${slug}`, query: { name: id } },
      `/admin/blog/articles/${slug}`
    );
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-center mt-8 text-xl mb-8">
          Gestion des articles du blog
        </h1>
        <div className="flex justify-center gap-2 sm:gap-10 flex-wrap sm:flex-row flex-col sm:w-2/3 mx-auto mt-4 drop-shadow-md">
          {posts &&
            posts.map((post: any) => (
              <div
                key={post.id}
                className="border-[1px] border-gray-500 w-11/12 mx-auto sm:w-1/4 bg-stone-100  rounded-lg"
              >
                <button onClick={() => handleClick(post.slug, post._id)}>
                  <div className="px-3 mt-1">
                    <p className="line-clamp-2 h-14 text-lg ">{post.title}</p>
                    <div className="mb-2 text-sm text-gray-500">
                      {post.date}
                    </div>
                  </div>
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="sm:h-64 h-48 w-full rounded-b-md"
                  />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
