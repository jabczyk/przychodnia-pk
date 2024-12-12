import { HTMLAttributes, SyntheticEvent, useState } from "react";

export const InfoCard: React.FC<HTMLAttributes<HTMLBaseElement>> = (
  p: HTMLAttributes<HTMLBaseElement>,
) => {
  const [clicked, setclicked] = useState<boolean>(false);

  return (
    <div
      onClick={() => setclicked(true)}
      className={`acitve:hidden group w-full cursor-pointer items-center gap-3 rounded-xl bg-orange p-3 capitalize text-black shadow-md ${clicked ? "hidden" : "flex"}`}
    >
      <div className="flex items-center justify-center p-1">
        <img className="h-5 w-5" src="/exc.png" alt=""></img>
      </div>
      <div>{p.children}</div>
    </div>
  );
};
