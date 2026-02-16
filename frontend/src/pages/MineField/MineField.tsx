import { memo, useCallback, useState } from "react";

const generateValues = () => {
  const values: { type: string; id: number }[] = [];

  for (let i = 0; i < 1000; i++) {
    values.push({
      id: i + 1,
      type: Math.ceil(Math.random() * 10) % 10 === 0 ? "mine" : "clear",
    });
  }

  return values;
};

const Mine = memo(
  (props: { type: string; id: number; onClick: (id: number) => void }) => {
    console.log(`Child called with id: ${props.id}`);

    if (props.type === "clear") {
      return (
        <div className="w-full flex flex-col items-center">
          This field is okay
        </div>
      );
    }

    return (
      <div className="flex flex-col p-2">
        <div className="border-b-2 border-gray-400 text-center p-2">
          This is a mine field
        </div>
        <div className="flex justify-around p-2">
          <button
            onClick={() => props.onClick(props.id)}
            className="bg-orange-400 hover:bg-orange-300 border-2 border-orange-700 rounded-md p-1"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
);

const MineField = () => {
  const [mines, setMinds] =
    useState<{ type: string; id: number }[]>(generateValues());

  const onClick = useCallback((id: number) => {
    setMinds((prev) => {
      const next = [...prev];

      const index = next.findIndex((item) => item.id === id);

      if (index >= 0) {
        next[index].type = "clear";
      }

      return next;
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <nav className="flex p-2 bg-green-500 shadow-2xl z-10">
        <div>MineField</div>
      </nav>

      <div className="grid grid-cols-4 gap-10 p-2">
        {mines.map((mine) => (
          <div
            className="col-span-1 p-2 rounded border-2 shadow-md"
            key={mine.id}
          >
            <Mine {...mine} onClick={onClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MineField;
