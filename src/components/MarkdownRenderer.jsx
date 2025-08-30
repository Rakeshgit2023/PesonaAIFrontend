import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy } from "react-icons/lu";
const MarkdownRenderer = ({ content }) => {
  const [loadingCopy, setLoadingCopy] = useState(false);
  const handleCopy = (text) => {
    setLoadingCopy(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setLoadingCopy(false);
    }, 1000);
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="relative bg-gray-900 rounded-lg my-2">
              <button
                onClick={() => handleCopy(String(children).trim())}
                className="absolute cursor-pointer top-2 right-2 flex gap-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                {loadingCopy ? (
                  <span>Copied</span>
                ) : (
                  <>
                    {" "}
                    <div>
                      <LuCopy />
                    </div>
                    <span>Copy code</span>
                  </>
                )}
              </button>
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-gray-200 px-1 py-0.5 rounded" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
