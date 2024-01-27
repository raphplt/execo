/* eslint-disable @next/next/no-img-element */
import { fetchBlog } from "@/services/blog/blog.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function LastArticles() {
	const [posts, setPosts] = useState<any>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			const result = await fetchBlog();
			setPosts(result);
		};
		fetchPosts();
	}, []);

	const handleClick = (slug: string, id: number) => {
		router.push(
			{ pathname: `/blog/articles/${slug}`, query: { name: id } },
			`/blog/articles/${slug}`
		);
	};

	return (
		<div className="flex w-2/3 mx-auto items-center justify-center gap-20">
			{posts &&
				posts.slice(0, 3).map((post: any) => (
					<div
						key={post.id}
						className="border-[1px] border-gray-500 w-11/12 mx-auto  bg-stone-100 rounded-md"
					>
						<button onClick={() => handleClick(post.slug, post._id)}>
							<div className="px-3 mt-1">
								<p className="line-clamp-2 h-14 sm:text-lg text-start flex gap-1 items-center">
									<ArrowForwardIosIcon fontSize="small" />
									{post.title}
								</p>
								<div className="mb-2 text-sm text-gray-500 text-start">
									le {new Date(post.date).getDay()}/{new Date(post.date).getMonth()}/
									{new Date(post.date).getFullYear()} par {post.author}
								</div>
								<div className="flex gap-3 my-2">
									{post.tags &&
										post.tags.map((tag: any) => (
											<span
												key={tag}
												className="bg-stone-200 border-[1px] border-gray-400 text-sm text-gray-500 px-2 py-1 rounded-xl mr-2"
											>
												{tag.charAt(0).toUpperCase() + tag.slice(1)}
											</span>
										))}
								</div>
							</div>
							<img
								src={post.cover}
								alt={post.title}
								className="sm:h-[300px] w-full h-64 rounded-b-md"
							/>
						</button>
					</div>
				))}
		</div>
	);
}
