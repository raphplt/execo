import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBarHeader from "./searchBarHeader";
import MetaData from "./metadatas";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Header() {
  const [isShowing, setIsShowing] = useState("none");
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const size = window.innerWidth;
      if (size < 640) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (asPath !== "/" && asPath !== "/decouvrir") {
      setIsShowing("block");
    } else {
      setIsShowing("none");
    }
  }, [asPath]);

  return (
			<div>
				<MetaData />
				{!isMobile ? (
					<div className="sticky top-0 z-50 backdrop-blur-md sm:w-[100%]">
						<div className="sm:flex-row sm:items-center sm:justify-between sm:w-[95%] sm:mx-auto sm:pt-2 sm:grid grid-cols-3 hidden ">
							<Link href={"/"} className="flex items-center justify-start gap-3">
								<Image
									src={require("../../public/assets/logo.png")}
									alt="logo"
									className="w-10"
								/>
							</Link>
							<div className="flex flex-row lg:gap-16 sm:gap-6 text-[#1B4332] items-center justify-center font-semibold z-[70]">
								<Link href={"/"}>
									<div className="rounded-2xl px-4 py-1 hover:bg-slate-100 transition-colors duration-200">
										Accueil
									</div>
								</Link>
								<Link href={"/decouvrir"}>
									<div className="rounded-2xl px-4 py-1 hover:bg-slate-100 transition-colors duration-200">
										Découvrir
									</div>
								</Link>
								<Link href={"/comparatif"}>
									<div className="rounded-2xl px-4 py-1 hover:bg-slate-100 transition-colors duration-200">
										Comparatif
									</div>
								</Link>
								<Link href={"/blog"}>
									<div className="rounded-2xl px-4 py-1 hover:bg-slate-100 transition-colors duration-200">
										Blog
									</div>
								</Link>
								<Link href={"/quiz"}>
									<div className="rounded-2xl px-4 py-1 hover:bg-slate-100 transition-colors duration-200">
										Quiz
									</div>
								</Link>
							</div>
							<div className="flex items-center gap-4 justify-end">
								<div style={{ display: isShowing }}>
									<SearchBarHeader />
								</div>

								{!user ? (
									<div className="flex gap-2">
										<Link href={"./login"}>
											<div className="text-center border-2 bg-[#C9D6CA] font-semibold border-[#234D1F] text-[#234D1F] transition-colors duration-200 hover:bg-[#adbeae] rounded-2xl py-2 px-4">
												Connexion
											</div>
										</Link>
										<br />
										<Link href={"./register"}>
											<div className="text-center border-2 bg-[#234D1F] hover:bg-[#32682d] transition-colors duration-200 font-semibold border-[#234D1F] hover:border-[#32682d] text-[#FFFFFF] rounded-2xl py-2 px-4">
												Inscription
											</div>
										</Link>
									</div>
								) : (
									<Link href={"./user"}>
										<div className="text-center border-2 bg-[#C9D6CA] transition-colors duration-200 hover:bg-[#adbeae]  font-semibold border-[#234D1F] text-[#234D1F] rounded-2xl py-2 px-4">
											Mon compte
										</div>
									</Link>
								)}
							</div>
						</div>
					</div>
				) : (
					<div
						className={`flex sm:hidden w-[90%] mx-auto pt-2 ${
							menuOpen
								? "h-[100vh] bg-[#234D1F] !w-[100%] items-start fixed z-[100] overflow-hidden top-0 justify-start flex-col"
								: "h-auto items-center justify-between"
						} `}
					>
						<div
							className={`flex justify-between items-center ${
								menuOpen ? "w-[90%] items-stretch mx-auto" : "w-[100%]"
							}`}
						>
							<Link
								href={"/"}
								className={`flex justify-start gap-1 ${
									menuOpen ? " place-items-start justify-normal" : "items-center"
								}`}
							>
								<Image
									src={require("../../public/assets/logo.png")}
									alt="logo"
									className="w-8"
								/>
								<span
									className={`text-lg  font-semibold ${
										menuOpen ? "text-white font-normal" : "text-[#1B4332]"
									}`}
								>
									Execo
								</span>
							</Link>

							<button
								className="flex items-center justify-center w-8 h-8"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								{menuOpen ? <CloseIcon /> : <MenuIcon />}
							</button>
						</div>
						{menuOpen && (
							<div className="text-white text-xl mt-16 flex flex-col gap-8 w-10/12 mx-auto">
								<Link href={"/"} className="flex gap-2 items-center">
									<ArrowForwardIosIcon />
									Accueil
								</Link>
								<Link href={"/decouvrir"} className="flex gap-2 items-center">
									<ArrowForwardIosIcon />
									Découvrir
								</Link>
								<Link href={"/comparatif"} className="flex gap-2 items-center">
									<ArrowForwardIosIcon />
									Comparatif
								</Link>
								<Link href={"/blog"} className="flex gap-2 items-center">
									<ArrowForwardIosIcon />
									Blog
								</Link>
								<Link href={"/quiz"} className="flex gap-2 items-center">
									<ArrowForwardIosIcon />
									Quiz
								</Link>
							</div>
						)}
						{menuOpen && (
							<div>
								{!user ? (
									<div className="flex gap-2 mt-12 mx-auto w-10/12">
										<Link href={"./login"}>
											<div className="text-center border-2 bg-[#C9D6CA] font-semibold border-[#234D1F] text-[#234D1F] rounded-2xl py-2 px-4">
												Connexion
											</div>
										</Link>
										<br />
										<Link href={"./register"}>
											<div className="text-center border-2 bg-[#234D1F] font-semibold border-[#C9D6CA] text-[#FFFFFF] rounded-2xl py-2 px-4">
												Inscription
											</div>
										</Link>
									</div>
								) : (
									<div className="flex gap-2 mt-12 mx-auto ml-6">
										<Link href={"./user"}>
											<div className="text-center border-2 bg-[#C9D6CA] font-semibold border-[#234D1F] text-[#234D1F] rounded-2xl py-2 px-4">
												Mon compte
											</div>
										</Link>
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		);
}
