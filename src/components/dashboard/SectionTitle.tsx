interface SectionTitleProps {
  title: string;
  results?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = (
  p: SectionTitleProps,
) => {
  return (
    <div className="mb-4 flex items-center">
      <h2 className="mr-3 text-2xl font-bold">{p.title}</h2>
      {p.results && p.results > 0 ? (
        <a className="mt-1 cursor-pointer text-xs font-semibold text-aquamarine">
          All results ({p.results}) &#8250;
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};
