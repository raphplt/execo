import Header from "@/components/header";
import Footer from "@/components/footer";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchArticle } from "@/services/blog/blog.service";
import { useArticleContext } from "@/context/articleContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Post() {
	const { articleData, setArticleData }: any = useArticleContext();
	const router = useRouter();

	// Utiliser le localStorage pour stocker l'ID si disponible
	const idRequest: any =
		typeof window !== "undefined"
			? localStorage.getItem("articleId") || router.query.name
			: router.query.name;

	useEffect(() => {
		if (typeof window !== "undefined" && idRequest) {
			// Stocker l'ID dans le localStorage
			localStorage.setItem("articleId", idRequest);
		}
	}, [idRequest]);

	useEffect(() => {
		const fetchDatas = async () => {
			try {
				if (idRequest) {
					const result = await fetchArticle(idRequest);
					setArticleData(result);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchDatas();
	}, [idRequest, setArticleData]);

	return (
		<div>
			<Header />
			<div
				className="w-10/12 sm:w-1/2 mx-auto mb-4 mt-8
      "
			>
				<div>
					<a href="../">
						<div className=" bg-green-200 mb-2  hover:bg-green-300 px-2 py-1 rounded-md w-fit flex items-center justify-center gap-2">
							<ArrowBackIcon fontSize="small" />
							Retour
						</div>
					</a>
					<span className="text-xl">{articleData.title}</span>
					<div className="text-sm mb-4 text-slate-500">
						{new Date(articleData.date).toUTCString()} par &nbsp;
						{articleData && articleData.author}
					</div>
					<div className="flex gap-3 my-2 mb-6">
						{articleData.tags &&
							articleData.tags.map((tag: any) => (
								<span
									key={tag}
									className="bg-stone-200 border-[1px] border-gray-400 text-sm text-gray-500 px-2 py-1 rounded-xl mr-2"
								>
									{tag.charAt(0).toUpperCase() + tag.slice(1)}
								</span>
							))}
					</div>
				</div>
				{articleData && (
					<div className="prose prose-lg max-w-none  sm:min-h-[70vh] text-justify flex gap-3 flex-col mb-24">
						<ReactMarkdown>{articleData.content}</ReactMarkdown>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}
