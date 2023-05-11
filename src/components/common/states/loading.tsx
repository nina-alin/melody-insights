import { Spinner } from "flowbite-react";

const Loading = () => (
  <div className="text-center">
    <Spinner
      aria-label="Center-aligned spinner example"
      className="text-spotify-primary"
      color={"#ffffff"}
    />
  </div>
);

export default Loading;
