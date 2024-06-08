import { createContext, useContext, useState } from "react";
type CommentProviderParams = {
  edit: boolean;
  setEdit: (value: boolean) => void;
  commentsID: string | null;
  setCommentstID: React.Dispatch<React.SetStateAction<string | null>>;
};
const CommentContext = createContext<CommentProviderParams | null>(null);

export const useComment = () => {
  return useContext(CommentContext) as CommentProviderParams;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const CommentProvider = ({ children }: ProviderProps) => {
  const [edit, setEdit] = useState(false);
  const [commentsID, setCommentstID] = useState<string | null>("");
  const intialValue: CommentProviderParams = {
    edit,
    setEdit,
    commentsID,
    setCommentstID,
  };

  return (
    <CommentContext.Provider value={intialValue}>
      {children}
    </CommentContext.Provider>
  );
};
