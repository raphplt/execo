// Dans un fichier context/articleContext.js
import { createContext, useContext, useState } from "react";

const ArticleContext = createContext([]);

export const ArticleProvider = ({ children }) => {
  const [articleData, setArticleData] = useState({});

  return (
    <ArticleContext.Provider value={{ articleData, setArticleData }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticleContext);
