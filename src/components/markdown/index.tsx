import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";

// Define types for props
interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.run();
  }, [markdown]);

  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Reset the message after 2 seconds
    });
  };

  const renderCodeBlock = ({
    node,
    inline,
    className,
    children,
    ...props
  }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = String(children).replace(/\n$/, "");

    return !inline && match ? (
      <div className="relative">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {codeContent}
        </SyntaxHighlighter>
        <button
          onClick={() => handleCopyClick(codeContent)}
          className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded"
          title="Copy code"
        >
          {copySuccess || "Copy"}
        </button>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  const renderMermaid = ({ value }: { value: string }) => {
    return <div className="mermaid">{value}</div>;
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: renderCodeBlock,
          mermaid: renderMermaid,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
