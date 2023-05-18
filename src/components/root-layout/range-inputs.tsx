import { setRange } from "@/reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

type RangeInputProps = {
  rangeInput: {
    name: string;
    value: string;
  };
};

const RangeInputs = ({ rangeInput }: RangeInputProps) => {
  const range = useSelector((state: RootState) => state.globalState.range);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-4">
      <input
        name="radio"
        type="radio"
        className="border-neutral-300 relative float-left h-5 w-5 appearance-none rounded-full border-2 border-solid font-black before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-spotify-primary checked:bg-black checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-spotify-primary checked:after:bg-spotify-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-spotify-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#000000] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
        checked={rangeInput.value === range}
        onChange={() => dispatch(setRange(rangeInput.value))}
      />
      <p className={`${rangeInput.value === range && "font-bold"}`}>
        {rangeInput.name}
      </p>
    </div>
  );
};

export default RangeInputs;
