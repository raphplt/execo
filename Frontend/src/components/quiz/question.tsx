export default function Question(props: any) {
  const handleClick = (answer: any) => {
    props.setQuizDatas([...props.quizDatas, answer]);
    props.setQuizId(props.quizId + 1);
  };

  return (
    <div key={props._id} className="mx-auto flex w-fit mt-24 flex-col">
      <h1 className="text-md w-10/12 text-center mx-auto sm:w-full  sm:text-xl font-semibold mb-8">
        {props.title}
      </h1>

      <div className="flex flex-col items-center gap-5 mt-4">
        {props.answers &&
          props.answers.map((answer: any) => (
            <button
              key={answer.name}
              onClick={() => handleClick(answer)}
              className="text-red rounded-lg flex items-center justify-between group relative h-12 w-64 overflow-hidden border border-[#67a344] bg-white px-3 text-[#67a344] shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#67a344] before:transition-all before:duration-500 hover:text-white hover:shadow-[#67a344] hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10">{answer.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  group-hover:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          ))}
      </div>
    </div>
  );
}
