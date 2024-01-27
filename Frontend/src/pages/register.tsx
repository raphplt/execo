import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import { checkEmail, register } from "@/services/users/users.service";

export default function Register() {
	const router = useRouter();
	const [user, setUser]: any = useState({
		last_name: "",
		first_name: "",
		email: "",
		phone: "",
		password: "",
		age: "",
		gender: "",
		infos: "",
	});

	const [emailOK, setEmailOK] = useState(false);
	const [requestOK, setRequestOK] = useState(false);

	const handleInputChange = (field: any, value: any) => {
		setUser({ ...user, [field]: value });
		if (field === "email") {
			checkEmailAvailability(value);
		} else {
			updateRequestOK();
		}
	};

	const checkEmailAvailability = async (email: any) => {
		const emailIsOK = await checkEmail(email);
		setEmailOK(emailIsOK);
		updateRequestOK();
	};

	const updateRequestOK = () => {
		const { email, password } = user;
		setRequestOK(email !== "" && !emailOK && password !== "");
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (requestOK) {
			try {
				console.log(user);
				await register(user);
				router.push("/login");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const renderInput = (
		id: any,
		placeholder: any,
		type = "text",
		options: any = []
	) => (
		<>
			{type === "select" ? (
				<select
					id={id}
					name={id}
					value={user[id]}
					onChange={(e) => handleInputChange(id, e.target.value)}
					className="sm:w-[300px] w-10/12 pl-1 py-1 border-secondary-color rounded-lg"
					required
				>
					{options.map((option: any) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					id={id}
					name={id}
					value={user[id]}
					onChange={(e) => handleInputChange(id, e.target.value)}
					placeholder={placeholder}
					className="sm:w-[300px] w-10/12 pl-1 py-1 border-secondary-color rounded-lg"
					required
				/>
			)}
			<div className="h-[2px] w-full bg-secondary-color mb-8"></div>
		</>
	);

	return (
		<div className="bg-[#E7F1E6]">
			<MetaData />
			<Header />
			<div className="sm:mt-36 sm:w-1/2 w-10/12 mx-auto bg-white mb-[500px] sm:grid sm:grid-cols-2 rounded-xl">
				<div className="py-20 bg-white rounded-l-xl">
					<h1 className="text-center text-3xl mb-16">Inscription</h1>
					<div className="flex flex-col items-center gap-10 ">
						<form className="flex flex-col" onSubmit={handleSubmit}>
							{renderInput("last_name", "Nom")}
							{renderInput("first_name", "Prénom")}
							{renderInput("email", "Adresse mail")}
							{emailOK && (
								<div className="ml-2 mb-8 text-red-500">Email déjà utilisé</div>
							)}
							{renderInput("gender", "Genre", "select", ["Homme", "Femme", "Autre"])}
							{renderInput("phone", "Téléphone", "tel")}
							{renderInput("age", "Age", "number")}
							{renderInput("password", "Mot de passe", "password")}
							<button
								type="submit"
								className={`${
									requestOK ? "bg-secondary-color" : "bg-slate-400 cursor-default"
								} text-white px-5 py-2 rounded-lg mt-12 mb-4`}
								disabled={!requestOK}
							>
								Créer un compte
							</button>
							<p className="text-sm text-center mt-4">
								<Link href={"/login"}>Vous avez déjà un compte ? Se connecter</Link>
							</p>
						</form>
					</div>
				</div>
				<div
					className="bg-green-200 py-20 rounded-r-xl hidden sm:flex"
					style={{
						backgroundImage: `url(${"/assets/bg/bg-1.jpg"})`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				></div>
			</div>

			<Footer />
		</div>
	);
}
