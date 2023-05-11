import { Badge } from "flowbite-react";

interface ClickableChipProps {
  label: string;
  onClick: () => void;
}

const ClickableChip = ({ label, onClick }: ClickableChipProps) => {
  return (
    <Badge
      className={
        "hover:text-gray-950 cursor-pointer rounded-3xl bg-spotify-primary text-white"
      }
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

export default ClickableChip;
