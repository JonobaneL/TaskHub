import fadeLoader from "../../assets/images/fadeLoader.svg";

type LoaderProps = {
  asChild?: boolean;
};

const Loader = ({ asChild = false }: LoaderProps) => {
  if (asChild) return <img src={fadeLoader} alt="Loading" />;
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <img src={fadeLoader} className="block w-14 h-14" alt="Loading" />
    </div>
  );
};

export default Loader;
