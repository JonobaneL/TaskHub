import fadeLoader from "../../assets/images/fadeLoader.svg";
import bouncingLoader from "../../assets/images/bouncingLoader.svg";

type LoaderProps = {
  asChild?: boolean;
  type: "fade" | "bouncing";
};

const Loader = ({ asChild = false, type }: LoaderProps) => {
  if (asChild)
    return type == "fade" ? (
      <img src={fadeLoader} alt="Loading" />
    ) : (
      <img src={bouncingLoader} alt="Loading" />
    );
  return (
    <div className="w-full h-20 flex items-center justify-center">
      {type == "fade" ? (
        <img src={fadeLoader} className="block w-14 h-14" alt="Loading" />
      ) : (
        <img src={bouncingLoader} className="block w-14 h-14" alt="Loading" />
      )}
    </div>
  );
};

export default Loader;
