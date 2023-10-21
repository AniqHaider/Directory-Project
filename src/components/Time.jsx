import { useNavigate } from "react-router-dom";
import CountryDropdown from "./CountryDropdown";

const Time = () => {
  const navigator = useNavigate();
  const goBack = () => {
    navigator("/");
  };
  return (
    <div className="flex justify-between flex-col md:flex-row gap-3">
      <button
        onClick={goBack}
        className=" border border-black rounded-md bg-blue-200 hover:bg-sky-400 px-4 py-2 mr-10 w-[100%] md:w-[10%]"
      >
        BACK
      </button>
      <CountryDropdown />
    </div>
  );
};

export default Time;
