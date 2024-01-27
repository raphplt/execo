/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBlog } from "@/services/blog/blog.service";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Blog() {
	const [posts, setPosts] = useState<any>([]);
	const router = useRouter();
	const [tags, setTags] = useState<any>([]);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			const result = await fetchBlog();
			setPosts(result);
		};
		fetchPosts();
	}, []);

	useEffect(() => {
		if (posts) {
			const uniqueTags = Array.from(
				new Set(posts.flatMap((post: any) => post.tags))
			);
			setTags(uniqueTags);
		}
	}, [posts]);

	const handleClick = (slug: string, id: number) => {
		const clickedTag =
			posts.find((post: any) => post.slug === slug)?.tags[0] || null;
		const newTag = selectedTag === clickedTag ? null : clickedTag;
		setSelectedTag(newTag);

		router.push(
			{ pathname: `/blog/articles/${slug}`, query: { name: id } },
			`/blog/articles/${slug}`
		);
	};

	return (
		<div className="">
			<Header />
			<div className="flex flex-col min-h-screen">
				<h1 className="text-xl text-center my-4 mt-8">
					Retrouvez tous nos articles :
				</h1>
				{tags && (
					<div className="flex flex-wrap justify-center gap-2 mb-4">
						<button
							key="all"
							className={`bg-stone-200 border-[1px] border-gray-400 text-sm text-gray-500 px-2 py-1 rounded-xl mr-2 ${
								selectedTag === null ? "bg-[#467c41] text-white" : ""
							}`}
							onClick={() => setSelectedTag(null)}
						>
							Tous
						</button>
						{tags.map((tag: any) => (
							<button
								key={tag}
								className={`bg-stone-200 border-[1px] border-gray-400 text-sm text-gray-500 px-2 py-1 rounded-xl mr-2 ${
									selectedTag === tag ? "bg-[#467c41] text-white" : ""
								}`}
								onClick={() => setSelectedTag(tag)}
							>
								{tag.charAt(0).toUpperCase() + tag.slice(1)}
							</button>
						))}
					</div>
				)}
				<div className="sm:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3 mx-auto mt-4 drop-shadow-md">
					{posts &&
						posts
							.filter((post: any) =>
								selectedTag ? post.tags.includes(selectedTag) : true
							)
							.map((post: any) => (
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
				<div className="sm:ml-24 mt-8 mb-4 flex flex-col"></div>
			</div>
			<Footer />
		</div>
	);
}
