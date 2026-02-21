import classNames from "classnames";
import { memo, useMemo, useState } from "react";

type Student = {
  id: string;
  name: string;
  age: number;
  grade: number;
  className: string;
};

const studentClassNames = [
  "All",
  "Physics",
  "Chemistry",
  "Biology",
  "Math",
  "English",
];

const getStudentData = (): Student[] => {
  const names = [
    "Liam Carter",
    "Sophia Martinez",
    "Noah Thompson",
    "Ava Reynolds",
    "Ethan Brooks",
    "Olivia Bennett",
    "Mason Patel",
    "Isabella Nguyen",
    "Lucas Morgan",
    "Amelia Johnson",
  ];

  const firstNames = names.map((name) => name.split(" ")[0]);
  const lastNames = names.map((name) => name.split(" ")[1]);
  const ages = [7, 8, 9, 10, 10, 11, 11, 12, 12, 12];
  const classNames = [
    "Physics",
    "Chemistry",
    "Biology",
    "Math",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Math",
    "English",
  ];
  const ITEM_COUNT = 10;

  const data = [];

  for (let i = 0; i < 1000; i++) {
    const firstName =
      firstNames[Math.floor(Math.random() * ITEM_COUNT) % ITEM_COUNT];
    const lastName =
      lastNames[Math.floor(Math.random() * ITEM_COUNT) % ITEM_COUNT];
    const age = ages[Math.floor(Math.random() * ITEM_COUNT) % ITEM_COUNT];
    const className =
      classNames[Math.floor(Math.random() * ITEM_COUNT) % ITEM_COUNT];
    data.push({
      id: `${i + 1}`,
      name: `${firstName} ${lastName}`,
      age,
      grade: 50 + (Math.ceil(Math.random() * 50) % 50),
      className,
    });
  }

  return data;
};

type RowProps = Student & { index: number };

const Row = memo(({ id, name, age, grade, className, index }: RowProps) => {
  return (
    <tr
      className={classNames("", {
        "bg-white": index % 2 === 0,
        "bg-gray-200": index % 2 === 1,
      })}
    >
      <td className="p-2 border-collapse">{id}</td>
      <td className="p-2 border-collapse">{name}</td>
      <td className="p-2 border-collapse">{age}</td>
      <td className="p-2 border-collapse">{grade}</td>
      <td className="p-2 border-collapse">{className}</td>
    </tr>
  );
});

type SortOrder = "asc" | "desc";

const StudentTable = () => {
  const data = useMemo(() => getStudentData(), []);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>(
    studentClassNames[0],
  );
  const [gradeSortOrder, setGradeSortOrder] = useState<SortOrder>("asc");

  const tableData = useMemo(() => {
    return data
      .filter((item) => {
        if (
          searchText &&
          !item.name.toLocaleLowerCase().includes(searchText.toLowerCase())
        ) {
          return false;
        }

        if (selectedClass !== "All" && item.className !== selectedClass) {
          return false;
        }

        return true;
      })
      .sort((a, b) =>
        gradeSortOrder === "asc" ? a.grade - b.grade : b.grade - a.grade,
      );
  }, [data, searchText, selectedClass, gradeSortOrder]);

  const summary = useMemo(() => {
    const count = tableData.length;
    const avgGrade =
      count > 0 ? tableData.reduce((sum, s) => sum + s.grade, 0) / count : 0;
    return { count, avgGrade: avgGrade.toFixed(2) };
  }, [tableData]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <nav className="sticky w-full top-0 left-0 bg-blue-400 shadow-xl p-2">
        <div className="text-white text-xl font-bold">Student DB</div>
      </nav>
      <div className="flex-1 min-h-0 flex flex-col p-2 gap-5">
        <div className="grid grid-cols-4">
          <div className="col-span-1 flex gap-2 items-center">
            <label htmlFor="searchText">Search Name</label>
            <input
              id="searchText"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="col-span-1 flex gap-2 items-center">
            <label htmlFor="filterClass">Class</label>
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="flex-1 min-w-0 p-2 border rounded"
            >
              {studentClassNames.map((option) => (
                <option
                  value={option}
                  key={option}
                  selected={selectedClass === option}
                  className="text-sm p-2"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 p-2 bg-gray-100 rounded">
          <span>
            <strong>Visible:</strong> {summary.count} students
          </span>
          <span>
            <strong>Avg Grade:</strong> {summary.avgGrade}
          </span>
        </div>
        <div className="flex-1 min-h-0 w-full overflow-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-400 font-bold text-md text-white">
              <tr>
                <th className="p-2 border-collapse">Id</th>
                <th className="p-2 border-collapse">Name</th>
                <th className="p-2 border-collapse">Age</th>
                <th className="p-2 border-collapse">
                  <button
                    type="button"
                    className="w-full text-left cursor-pointer hover:bg-gray-500 py-1 px-1 -mx-1 rounded"
                    onClick={() =>
                      setGradeSortOrder((prev) =>
                        prev === "asc" ? "desc" : "asc",
                      )
                    }
                  >
                    Grade {gradeSortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </th>
                <th className="p-2 border-collapse">Class</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <Row key={row.id} index={index} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
