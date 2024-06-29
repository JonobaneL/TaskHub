import { IoClose } from "react-icons/io5";

type FileField = {
  icon: React.ReactNode;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  clearHandler: () => void;
};

const FileField = ({
  icon,
  accept = "",
  file,
  onChange,
  clearHandler,
}: FileField) => {
  return (
    <div className="w-full flex items-center gap-2 relative">
      <label className="w-fit h-fit block">
        <div className="size-16 border cursor-pointer rounded shadow gap-1 p-1 flex items-center justify-center flex-col overflow-hidden">
          <>{icon}</>
          <p className="text-xs font-main font-medium text-gray-600">Browse</p>
          <input
            id="#img"
            className="size-0"
            onChange={onChange}
            type="file"
            accept={accept}
          />
        </div>
      </label>
      {file?.name ? (
        <>
          <p className="text-sm font-main text-nowrap truncate text-sm">
            {file?.name}
          </p>
          <div className="absolute right-0 top-0">
            <IoClose
              size="1.2rem"
              className="cursor-pointer"
              onClick={clearHandler}
            />
          </div>
        </>
      ) : (
        <p className="text-sm font-main text-sm text-gray-400">
          Choose your avatar
        </p>
      )}
    </div>
  );
};

export default FileField;
