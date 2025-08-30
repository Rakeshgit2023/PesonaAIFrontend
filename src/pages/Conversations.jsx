import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { RiSendPlaneFill } from "react-icons/ri";
import Context from "../context/Context";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader, SyncLoader } from "react-spinners";
import MarkdownRenderer from "../components/MarkdownRenderer";
const Conversations = () => {
  const [typedContent, setTypedContent] = useState("");
  const { users } = useContext(Context);
  const currentMessage = useRef(null);
  const [searchParams] = useSearchParams();
  const [userInput, setUserInput] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState("");
  const user = searchParams.get("user");
  const selectedUser =
    users[0]?.name === user
      ? users[0]
      : users[1]?.name === user
      ? users[1]
      : "";
  const [messages, setMessages] = useState([]);
  const createChat = async (messages) => {
    setLoadingContent(true);
    const payload = { messages, userName: user };
    setMessages(messages);
    setUserInput("");
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_BACKEND_URL}/personaAI/create`,
        payload
      );
      setMessages([...messages, ...[response?.data?.message]]);
      console.log(response?.data?.message);
      setLoadingContent(false);
    } catch (error) {
      setError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingContent(false);
    }
  };
  useEffect(() => {
    createChat([
      {
        role: "user",
        content: "Hii",
      },
    ]);
  }, []);

  useEffect(() => {
    console.log(messages);
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      let index = 0;
      setTypedContent("");

      const interval = setInterval(() => {
        if (index < lastMessage.content.length) {
          setTypedContent((prev) => {
            const updated = prev + lastMessage.content.charAt(index);
            index++;

            // ✅ Scroll as content updates
            setTimeout(() => {
              currentMessage.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }, 0);

            return updated;
          });
        } else {
          clearInterval(interval);
        }
      }, 1); // Adjust typing speed here

      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <>
      <NavBar selectedUser={selectedUser} />
      <div
        className={`h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-3 px-16 ${
          error && "justify-center items-center"
        }`}
      >
        {error === "" ? (
          <>
            {" "}
            <div className="h-[90%] rounded-lg shadow-sm mt-2 p-4 overflow-y-auto scrollbar-hidden">
              {messages?.map((message, index) => {
                const isOwnMessage = message?.role === "user";
                // const htmlContent = marked(message?.content);
                return (
                  index !== 0 && (
                    <div
                      key={index}
                      className={`flex gap-4 mt-6 ${
                        isOwnMessage
                          ? "w-[50%] ml-auto justify-start flex-row-reverse items-end"
                          : "w-[65%] mr-auto justify-start items-end"
                      }`}
                    >
                      {isOwnMessage ? (
                        <div className=" rounded-full bg-purple-700 py-2 px-3.5 text-white flex justify-center items-center font-semibold">
                          U
                        </div>
                      ) : (
                        <img
                          src={selectedUser?.image}
                          className="rounded-full h-10 w-10"
                        />
                      )}

                      <div className="flex flex-col gap-1 max-w-full">
                        <div
                          className={`rounded-lg shadow-sm px-2.5 lg:text-xs xl:text-sm break-words font-medium
                        ${
                          isOwnMessage
                            ? "py-3.5 bg-gradient-to-r from-purple-500  to-purple-400 text-white"
                            : "py-3.5 bg-[#EFF8FF] border border-slate-200 text-slate-500"
                        }
                     
                    `}
                        >
                          {/* TEXT CONTENT */}
                          {
                            message.content?.trim() &&
                              (isOwnMessage ? (
                                <div className="whitespace-pre-line">
                                  {" "}
                                  {message?.content}
                                </div>
                              ) : index === messages.length - 1 &&
                                message.role === "assistant" ? (
                                <MarkdownRenderer
                                  content={typedContent || ""}
                                />
                              ) : (
                                <MarkdownRenderer content={message?.content} />
                              ))
                            //  (
                            //   <div
                            //     className="whitespace-pre-line"
                            //     dangerouslySetInnerHTML={{ __html: htmlContent }}
                            //   />

                            // )
                          }
                        </div>

                        {/* TIMESTAMP */}
                        {/* <span
                    className={`text-[10px] ${
                      isOwnMessage ? "text-end" : "text-start"
                    } text-gray-500`}
                  >
                    {new Date(message?.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span> */}
                      </div>
                    </div>
                  )
                );
              })}
              {loadingContent && (
                <div
                  className={`flex w-[50%] mb-4 gap-4
                  mr-auto justify-start items-end
                `}
                >
                  <img
                    src={selectedUser?.image}
                    className="rounded-full h-10 w-10"
                  />
                  <div className="px-4 py-1.5 rounded-md shadow-md">
                    <SyncLoader
                      loading={loadingContent}
                      size={5}
                      color="#6b46c1"
                    />
                  </div>
                </div>
              )}
              <div ref={currentMessage} />
            </div>
            <div className="h-[10%] mb-2 flex gap-2 px-8">
              <input
                value={userInput}
                placeholder="Enter your text here.."
                className="w-[95%] h-full border border-slate-300 rounded-xl resize-none p-2 text-xs md:text-sm font-medium text-slate-700 focus:outline-none focus:ring-0"
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (userInput.trim()) {
                      createChat([
                        ...messages,
                        { role: "user", content: userInput },
                      ]);
                      // clear input after sending
                    }
                  }
                }}
              />

              <div
                className="w-[5%] h-full bg-purple-600 rounded-xl flex items-center justify-center text-3xl text-white"
                onClick={() =>
                  !loadingContent &&
                  createChat([
                    ...messages,
                    ...[{ role: "user", content: userInput }],
                  ])
                }
              >
                {loadingContent ? (
                  <ClipLoader
                    loading={loadingContent}
                    size={30}
                    color="white"
                  />
                ) : (
                  <RiSendPlaneFill />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-2xl text-slate-400 font-semibold">{error}</div>
        )}
      </div>
    </>
  );
};
export default Conversations;
