interface GreenButtonProps {
  onClick: () => void;
  label: string;
  selected?: boolean;
}

const GreenButton = ({ onClick, label, selected }: GreenButtonProps) => (
  <button
    onClick={onClick}
    className={`rounded-full border ${
      selected ? "text-gray-800" : "text-white"
    } border-green-500 bg-spotify-primary px-4 py-2 font-semibold shadow hover:text-gray-800`}
  >
    {label}
  </button>
);

export default GreenButton;
