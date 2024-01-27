import Footer from "@/components/footer";
import Header from "@/components/header";
import MetaData from "@/components/metadatas";
import Question from "@/components/quiz/question";
import { fetchQuiz } from "@/services/quiz/quiz.service";
import { useState, useEffect } from "react";
import Image from "next/image";
import Tips from "@/components/quiz/tips";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Quiz() {
  const [quiz, setQuiz]: any = useState({});
  const [quizId, setQuizId]: any = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDatas, setQuizDatas] = useState([]);
  // const [quizStep, setQuizStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchQuiz();
      setQuiz(result);
    };
    fetchData();
  }, []);

  // Get window width
  useEffect(() => {
    if (typeof window !== "undefined") {
      const size = window.innerWidth;
      setWindowWidth(size);
    }
  }, []);

  // Start quiz
  const startQuiz = () => {
    setQuizId(1);
    setShowQuiz(true);
  };

  // Calculate score
  useEffect(() => {
    let score = 0;
    quizDatas.forEach((answer: any) => {
      score += answer.score;
    });
    setScore(score);
  }, [quizDatas]);

  return (
    <div>
      <MetaData />
      <Header />
      {!showQuiz && (
        <div className="mx-auto flex bg-[#b6e6b9] w-11/12 sm:w-2/3 sm:min-h-[70vh] flex-col gap-12 mt-24 text-center sm:py-24 px-4 py-4 sm:px-24 rounded-2xl drop-shadow-md mb-24">
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-start gap-20 flex-col mx-auto w-full">
              <h1 className="text-2xl sm:text-4xl leading-relaxed w-3/4 textjus text-[#20311f] text-left">
                Connaissez vous l&apos;impact de vos achats en ligne sur la
                planète ?
              </h1>
              <button
                onClick={startQuiz}
                className="group relative py-3 w-fit px-12 overflow-hidden rounded-lg bg-[#377431] text-lg shadow"
              >
                <div className="absolute inset-0 w-3 bg-[#49b440]  transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-white group-hover:text-white">
                  Commencer notre quiz
                </span>
              </button>
              <ul className="flex flex-col items-start gap-5 text-xl text-[#20311f]">
                <li className="flex items-center gap-2">
                  <ArrowForwardIosIcon fontSize="small" /> Rapide et simple
                  (moins de 5 minutes)
                </li>
                <li>
                  <ArrowForwardIosIcon fontSize="small" /> Des conseils et
                  astuces personnalisés
                </li>
                <li>
                  <ArrowForwardIosIcon fontSize="small" /> Un score pour évaluer
                  votre impact
                </li>
              </ul>
            </div>
            <Image
              src="/assets/quizz/question.png"
              width={1000}
              height={1000}
              alt="question image"
              className="w-10/12 mx-auto sm:w-full"
            />
          </div>
        </div>
      )}
      <div>
        {quizId === quiz.length + 1 ? (
          <div>
            <h1 className="sm:text-2xl text-lg text-center mt-24">
              Merci d&apos;avoir répondu à notre quiz !
            </h1>
            <div className="w-4/5 mx-auto mt-12 sm:mt-36">
              <h2 className="text-center sm:text-lg">
                Votre score : <strong>{score} / 55</strong>
              </h2>
              <div className="mt-24 text-lg sm:text-xl text-center">
                Nos conseils :
              </div>
              <div className="flex w-2/3 mx-auto wrap gap-5 mt-5 flex-wrap items-center justify-center">
                <Tips
                  title="Réduisez, Réutilisez, Recyclez"
                  tips="La règle des 'trois R' est un rappel simple pour minimiser les déchets. Réduisez la consommation, réutilisez les articles autant que possible et recyclez correctement."
                  img="https://www.gov.sg/images/default-source/media/gov/3rs-article-bp.png?sfvrsn=6c649615_0"
                />
                <Tips
                  title="Privilégiez les produits durables"
                  tips="Choisissez des produits de haute qualité qui durent plus longtemps et réduisent la consommation globale."
                  img="https://lamatriz.org/wp-content/uploads/2020/09/produits-durables-ecologiques-boutique-ligne-creacolo.jpg"
                />
                <Tips
                  title="Priorisez les produits éco-responsables"
                  tips="Optez pour des produits fabriqués avec des matériaux durables, recyclables ou biodégradables. Recherchez des certifications environnementales, telles que l'écolabel."
                  img="https://cdn.shopify.com/s/files/1/0509/9959/1094/files/notre-engagement-ecoresponsable.jpg?v=1649147880"
                />
                <Tips
                  title="Évitez la surconsommation en ligne"
                  tips="Avant d'acheter, posez-vous la question : en ai-je vraiment besoin ? Évitez les achats impulsifs en faisant une liste préalable et en limitant les achats non essentiels."
                  img="https://images.ladepeche.fr/api/v1/images/view/606f3ddd8fe56f5b735de8a8/large/image.jpg?v=1"
                />
                <Tips
                  title="Optimisez la livraison"
                  tips="Regroupez vos achats pour réduire le nombre de colis et ainsi l'empreinte carbone. Préférez les options de livraison éco-responsables ou les points de collecte."
                  img="https://www.lsa-conso.fr/mediatheque/1/6/3/000382361_896x598_c.jpg"
                />
                <Tips
                  title="Favorisez les marchés locaux en ligne"
                  tips="Soutenez les petits commerçants locaux en effectuant des achats en ligne sur des plateformes locales. Cela réduit les émissions liées au transport de marchandises sur de longues distances."
                  img="https://cdn.paris.fr/paris/2020/04/08/huge-9e333915d1a825bcef98f362c8a375d6.jpg"
                />
                <Tips
                  title="Recyclez les emballages en ligne"
                  tips="Lorsque possible, recyclez ou réutilisez les emballages reçus lors de vos achats en ligne. Contribuez ainsi à réduire les déchets d'emballage."
                  img="https://blog.dssmith.com/hubfs/France/Blog/%2314%20-%20Comment%20communiquer%20sur%20le%20recyclage%20d%E2%80%99emballage%20avec%20vos%20clients.png"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="">
        {quiz &&
          showQuiz &&
          quiz.slice(quizId - 1, quizId).map((quiz: any) => (
            <div
              key={quiz._id}
              className="flex flex-col py-24 justify-between h-[100vh]"
            >
              <Question
                key={quiz._id}
                {...quiz}
                quizId={quizId}
                setQuizId={setQuizId}
                quizDatas={quizDatas}
                setQuizDatas={setQuizDatas}
              />
              <div className="h-6 w-full bg-slate-300 sm:block hidden">
                <div
                  className="h-6 bg-[#57bd61] rounded-r-xl"
                  style={{
                    width:
                      (quizId - 1) *
                      ((windowWidth - windowWidth * 0.5) /
                        Object.keys(quiz).length),
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
      {!showQuiz && <Footer />}
    </div>
  );
}
