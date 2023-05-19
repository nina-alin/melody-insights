import { Spinner } from "flowbite-react";

const Loading = () => (
  <div className="grid h-screen grid-cols-3 grid-rows-3 place-items-center">
    <div className="col-start-2 row-start-2 ">
      <Spinner aria-label="spinner" color="#ffffff" />
    </div>
  </div>
);

export default Loading;
