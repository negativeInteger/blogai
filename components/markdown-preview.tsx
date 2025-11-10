import MarkdownPreview from "@uiw/react-markdown-preview";

export default function Markdown({ source }: { source: string }) {
  return (
    <MarkdownPreview
      source={source}
      style={{
        backgroundColor: "transparent",
        color: "inherit",
        padding: 0,
      }}
    />
  );
}
