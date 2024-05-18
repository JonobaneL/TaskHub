type ButtonProps = {
  img: string;
};

const HoverEditButton = ({ img }: ButtonProps) => {
  return (
    <div className="w-full h-full p-1 group flex items-center justify-center cursor-pointer">
      <img
        className="w-4 opacity-0 group-hover:opacity-100 transition-opacity	duration-200"
        src={img}
        alt="add note"
      />
    </div>
  );
};

export default HoverEditButton;
