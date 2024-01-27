import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import { login } from "@/services/users/users.service";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfos, setuserInfos] = useState({});
  const router = useRouter();



  const handleSubmit = async (e: any) => {
			e.preventDefault();
			try {
				const response = await login({ email: email, password: password });
				setuserInfos(response);

				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(response));

				if (response.role === "admin") {
					router.push("/admin");
				}
				if (response.role === "user") {
					router.push("/");
				}
			} catch (error) {
				console.log("error", error);
			}
		};

  return (
			<div className="bg-[#E7F1E6]">
				<MetaData />
				<Header />
				<div className="sm:mt-36  w-10/12 sm:w-1/2 mx-auto bg-white mb-[500px] sm:grid sm:grid-cols-2 rounded-xl">
					<div className="py-20 bg-white rounded-l-xl">
						<h1 className="text-center text-3xl mb-16">Connexion</h1>
						<div className="flex flex-col items-center gap-10 ">
							<form className="flex flex-col" onSubmit={handleSubmit}>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Adresse mail"
									onChange={(e) => setEmail(e.target.value)}
									required
									className="sm:w-[300px] w-10/12 pl-1 py-1 border-secondary-color rounded-lg focus:outline-none"
								/>
								<div className="h-[2px] w-full bg-secondary-color mb-12"></div>

								<input
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									className="sm:w-[300px] w-10/12 pl-1 py-1 border-secondary-color rounded-lg focus:outline-none"
									placeholder="Mot de passe"
									required
								/>
								<div className="h-[2px] w-full bg-secondary-color mb-12"></div>
								<button
									type="submit"
									className="bg-secondary-color text-white px-5 py-2 rounded-lg mt-12 mb-4"
								>
									Connexion
								</button>
								<p className="text-sm text-center mt-4">
									<Link href={"/register"}>
										Vous n&#39;avez pas de compte ? Inscription
									</Link>
								</p>
							</form>
						</div>
					</div>
					<div
						className="bg-green-200 py-20 rounded-r-xl  hidden sm:flex"
						style={{
							backgroundImage: `url(${"/assets/bg/bg-7.jpg"})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
					></div>
				</div>

				<Footer />
			</div>
		);
}
