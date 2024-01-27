import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import {
  deleteArticle,
  fetchArticle,
  updateArticle,
} from "@/services/blog/blog.service";
import ReactMarkdown from "react-markdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import HistoryIcon from "@mui/icons-material/History";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import TitleIcon from "@mui/icons-material/Title";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useArticleContext } from "@/context/articleContext";

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

  const [deleteCheck, setDeleteCheck] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    content: "",
    date: "",
    author: "",
  });

  useEffect(() => {
    setEditedData({
      title: articleData.title,
      content: articleData.content,
      date: articleData.date,
      author: articleData.author,
    });
  }, [articleData]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedData({ ...editedData, content: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, date: e.target.value });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, author: e.target.value });
  };

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSave = async () => {
    const data = {
      title: editedData.title,
      content: editedData.content,
      date: editedData.date,
      cover: articleData.cover,
      author: editedData.author,
    };
    try {
      await updateArticle(articleData._id, data);
      setArticleData(data);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  const handleDelete = async (idRequest: number) => {
    if (deleteCheck) {
      try {
        await deleteArticle(idRequest);
      } catch (error) {
        console.error(error);
      }
      router.push("/admin/blog");
    }
  };

  return (
    <div>
      <Header />
      <div className="w-3/4 mx-auto">
        <a href="../">
          <div className=" bg-green-200 hover:bg-green-300 px-2 py-1 rounded-md w-fit flex items-center justify-center gap-2">
            <ArrowBackIcon />
            Retour
          </div>
        </a>
      </div>
      <form>
        <div className="w-10/12 sm:w-1/2 mx-auto mb-4 mt-4">
          <div>
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={isEditing ? handleSave : handleToggleEdit}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md flex gap-1 items-center justify-center"
              >
                {isEditing ? (
                  <div className="flex items-center justify-center gap-1">
                    <SaveIcon fontSize="small" />
                    Sauvegarder
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <EditIcon fontSize="small" />
                    Modifier
                  </div>
                )}
              </button>
              <a
                className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-md flex gap-1 items-center justify-center"
                href={`/blog/${articleData._id}`}
              >
                <VisibilityIcon fontSize="small" />
                Voir l&apos;article
              </a>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-md flex items-center justify-center gap-1"
                >
                  <ClearIcon fontSize="small" />
                  Annuler les modifications
                </button>
              )}
              {!deleteCheck && (
                <button
                  type="button"
                  className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded-md flex items-center justify-center gap-1"
                  onClick={() => setDeleteCheck(true)}
                >
                  <DeleteIcon fontSize="small" />
                  Supprimer l&apos;article
                </button>
              )}
              {deleteCheck && (
                <div className="flex">
                  <button
                    onClick={() => handleDelete(articleData._id)}
                    className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded-md  flex items-center justify-center gap-1"
                  >
                    <WarningIcon fontSize="small" />
                    Confirmer la suppression
                  </button>
                  <button
                    onClick={() => setDeleteCheck(false)}
                    className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-md  flex items-center justify-center gap-1"
                  >
                    <HistoryIcon fontSize="small" />
                    Annuler la suppression
                  </button>
                </div>
              )}
              &nbsp;
            </div>
            {isEditing ? (
              <div className="mt-8 flex flex-col gap-3 mb-3">
                <div className="flex gap-2 ">
                  <TitleIcon fontSize="small" />
                  <input
                    type="text"
                    value={editedData.title}
                    onChange={handleTitleChange}
                    className="w-full border-b-2 border-gray-300 mb-4"
                  />
                </div>
                <div className="flex gap-2">
                  <CalendarTodayIcon fontSize="small" />
                  <input
                    type="text"
                    value={editedData.date}
                    onChange={handleDateChange}
                    className="w-full border-b-2 border-gray-300 mb-4"
                  />
                </div>
                <div className="flex gap-2">
                  <AccountCircleIcon fontSize="small" />
                  <input
                    type="text"
                    value={editedData.author}
                    onChange={handleAuthorChange}
                    className="w-full border-b-2 border-gray-300 mb-4"
                  />
                </div>
              </div>
            ) : (
              <>
                <span>{articleData.title}</span>
                <div className="text-sm mb-4 text-slate-500">
                  {new Date(articleData.date).toUTCString()} par{" "}
                  {articleData && articleData.author}
                </div>
              </>
            )}
          </div>
          {isEditing && (
            <div className="flex gap-2 sm:mb-12">
              <DescriptionIcon fontSize="small" />
              <textarea
                value={editedData.content}
                onChange={handleContentChange}
                className="w-full h-[70vh] bg-zinc-100 rounded-md px-2 py-2"
                rows={10}
              />
            </div>
          )}
          {!isEditing && (
            <div className="prose prose-lg max-w-none min-h-[70vh] w-full text-justify flex gap-3 flex-col mb-24">
              <ReactMarkdown>{articleData.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
}
