import "./loader.css";

const Loader = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="lds-ellipsis text-black">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
