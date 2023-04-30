import { Spinner } from "flowbite-react";

const Loading = () => (
  <div className="text-center">
    <Spinner
      aria-label="Center-aligned spinner example"
      className="text-green-500"
      color={"#ffffff"}
    />
  </div>
);

export default Loading;
