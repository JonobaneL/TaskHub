import { EditorContent, useEditor } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useRef } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import { configureEditor } from "@/utils/configureEditor";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
};

const Editor = ({ value, onChange, onClose = () => {} }: EditorProps) => {
  const editorConfig = configureEditor(value, onChange);
  const editor = useEditor(editorConfig);
  const editorRef = useRef<HTMLDivElement>(null);
  const onBlur = (e: Event) => {
    if (!editorRef.current?.contains(e.target as Node)) {
      onClose();
    }
  };
  useEventListener("click", onBlur);
  return (
    <div ref={editorRef}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
