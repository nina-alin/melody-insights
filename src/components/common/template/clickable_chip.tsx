import { Badge } from "flowbite-react";

interface ClickableChipProps {
  label: string;
  onClick: () => void;
}

const ClickableChip = ({ label, onClick }: ClickableChipProps) => {
  return (
    <Badge
      className={
        "cursor-pointer rounded-3xl bg-green-500 text-white hover:text-gray-950"
      }
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

export default ClickableChip;
