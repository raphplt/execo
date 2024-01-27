import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import Footer from "@/components/footer";

export default function CalculsScores() {
  return (
    <div>
      <Header />
      <MetaData />
      <div className="h-[75vh]">
        <h1 className="mt-24 text-center text-3xl">
          Hum, c&apos;est un peu vide par ici...
        </h1>
        <p className="text-center mt-12 text-xl">
          Nous vous invitons à revenir un peu plus tard, cette page est encore
          en construction
        </p>
      </div>

      <Footer />
    </div>
  );
}
