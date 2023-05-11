interface SectionTitleProps {
  children: string;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h5 className="text-2xl font-bold">{children}</h5>
);

export default SectionTitle;
