type ButtonProps = {
  img: string;
};

const HoverEditButton = ({ img }: ButtonProps) => {
  return (
    <div className="w-full h-full p-1 group">
      <div className="w-full h-full group-hover:border border-grey-500 flex items-center justify-center cursor-pointer">
        <img
          className="w-5 opacity-0 group-hover:opacity-100 transition"
          src={img}
          alt="add note"
        />
      </div>
    </div>
  );
};

export default HoverEditButton;
