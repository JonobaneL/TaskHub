import { EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const configureEditor = (
  value: string,
  onChange: (value: string) => void
) => {
  return {
    extensions: [
      StarterKit.configure({
        strike: {
          HTMLAttributes: {
            class: "underline",
          },
        },
        bulletList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "ml-4",
          },
        },
        orderedList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "ml-4",
          },
        },
      }),
    ],
    content: value,
    autofocus: "start",
    editorProps: {
      attributes: {
        class:
          "space-y-[2px] [&_ul_li]:list-disc [&_ol_li]:list-decimal min-h-20 w-full rounded-b-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  } as Partial<EditorOptions>;
};
