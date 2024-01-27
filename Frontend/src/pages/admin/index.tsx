import Header from "@/components/header";
import Link from "next/link";

export default function Admin() {
  return (
    <div>
      <Header />

      <div className="flex justify-evenly mx-auto w-1/2 mt-12">
        <a className="bg-green-300 py-4 px-12 rounded-lg drop-shadow-md">
          <h1>Ajouter un Produit</h1>
        </a>
        <a className="bg-green-300 py-4 px-12 rounded-lg drop-shadow-md">
          <h1>Gestion des utilisateurs</h1>
        </a>
        <Link
          className="bg-green-300 py-4 px-12 rounded-lg drop-shadow-md"
          href="/admin/blog"
        >
          <h1>Gestion du blog</h1>
        </Link>
      </div>
    </div>
  );
}
