import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";
import { IoCopyOutline } from "react-icons/io5";
import Hand from "@/public/hand.png";

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
          style={{ ...vscDarkPlus, borderRadius: "10" }}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {codeContent}
        </SyntaxHighlighter>
        <button
          onClick={() => handleCopyClick(codeContent)}
          className="absolute top-2 right-2 bg-[#0c0c0c50] text-white p-2 rounded text-[1.25rem] flex items-center"
          title="Copy code"
        >
          <IoCopyOutline className="w-5 h-5 mr-2" />
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

  // Custom renderer for images
  const renderImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          margin: "20px 0",
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "1/1",
          objectFit: "contain",
        }}
      />
    );
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code: renderCodeBlock,
          mermaid: renderMermaid,
          img: renderImage, // Fix for inline base64 images
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
