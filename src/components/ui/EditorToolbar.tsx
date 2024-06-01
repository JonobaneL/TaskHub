import { type Editor } from "@tiptap/react";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { Toggle } from "./toggle";
import {
  GoBold,
  GoItalic,
  GoListOrdered,
  GoListUnordered,
} from "react-icons/go";

type ToolbarProps = {
  editor: Editor | null;
};

const EditorToolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;
  const toolbar = [
    {
      pressed: editor?.isActive("bold"),
      callback: () => editor?.chain().focus().toggleBold().run(),
      icon: <GoBold className="size-full" />,
    },
    {
      pressed: editor?.isActive("italic"),
      callback: () => editor?.chain().focus().toggleItalic().run(),
      icon: <GoItalic className="size-full" />,
    },
    {
      pressed: editor?.isActive("strike"),
      callback: () => editor?.chain().focus().toggleStrike().run(),
      icon: <MdOutlineFormatUnderlined className="size-full" />,
    },
    {
      pressed: editor?.isActive("bulletList"),
      callback: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <GoListUnordered className="size-full" />,
    },
    {
      pressed: editor?.isActive("orderedList"),
      callback: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <GoListOrdered className="size-full" />,
    },
  ];

  return (
    <div className="flex gap-0.5 p-1 h-fit w-full rounded-t-sm border">
      {toolbar.map((item, index) => (
        <Toggle
          key={index}
          pressed={item.pressed}
          onPressedChange={item.callback}
          className="flex items-center justify-center size-8 p-2"
        >
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default EditorToolbar;
