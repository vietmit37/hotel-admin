"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
import React, { useState } from "react";
import moment from "moment";
import CardCustom from "@/components/Card";
import { getRandomGradient } from "@/helpers";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
interface IData {
  date: string;
  totalOcc: number;
  arrRooms: number;
  depRooms: number;
}

const totalOccValues = [
  166, 172, 132, 118, 103, 100, 116, 112, 94, 88, 104, 122, 136, 139, 439, 377,
  357, 330, 403, 166, 115, 80, 56, 46, 43, 79, 44, 44, 27, 47, 49, 56, 44, 34,
  38, 37, 37, 37, 37, 46, 36, 46, 30, 33, 40, 26, 40, 48, 76, 37, 28, 57, 227,
  55, 44, 37, 31, 44, 50, 43, 31, 36, 34, 26, 26, 26, 25, 46, 24, 30, 33, 25,
  41, 43, 37, 24, 29, 26, 26, 26, 24, 62, 51, 24, 36, 29, 32, 32, 54, 49, 37,
  41, 35, 38, 54, 60, 34, 36, 33, 22, 29, 29, 22, 40, 22, 22, 22, 22, 22, 30,
  27, 23, 26, 21, 28, 28, 34, 26, 21, 21, 21, 28, 28, 34, 26, 21, 26, 21, 21,
  54, 67, 59, 21, 26, 21, 21, 21, 39, 46, 21, 4, 4, 4, 4, 17, 9, 4, 4, 4, 4, 4,
  29, 10, 4, 11, 5, 5, 7, 19, 5, 5, 10, 3, 3, 3, 28, 23, 3, 8, 3, 3, 3, 16, 3,
  3, 8, 3, 106, 106, 120, 106, 3,
];
const arrRoomsValues = [
  109, 91, 77, 56, 75, 54, 58, 80, 46, 42, 61, 77, 80, 88, 412, 46, 41, 21, 167,
  31, 54, 32, 17, 17, 8, 43, 1, 11, 3, 2, 3, 4, 0, 1, 2, 3, 4, 3, 5, 1, 0, 0, 0,
  1, 0, 0, 9, 1, 3, 1, 2, 0, 1, 2, 0, 2, 0, 0, 2, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 3, 2, 0, 0, 1, 0, 0, 4,
  0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0,
];
const arrDeepRooms = [
  66, 85, 117, 70, 90, 57, 42, 84, 64, 48, 45, 59, 66, 85, 111, 108, 61, 48, 94,
  267, 105, 67, 41, 27, 11, 7, 46, 5, 18, 5, 5, 0, 3, 3, 2, 2, 2, 6, 2, 4, 6, 1,
  0, 1, 1, 0, 0, 1, 1, 2, 10, 1, 1, 2, 1, 1, 2, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 0,
  1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 1, 0,
  0, 0, 0, 3, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
];
const arrDates = Array.from({ length: 182 }, (_, i) =>
  moment("2020-02-01").startOf("day").add(i, "days").format("YYYY-MM-DD"),
);
const data1: IData[] = totalOccValues.map((item, index) => ({
  date: arrDates[index],
  totalOcc: item,
  arrRooms: arrRoomsValues[index],
  depRooms: arrDeepRooms[index],
}));
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const today = moment("2020-01-31").startOf("day").format("YYYY-MM-DD");
const oneMonth = moment("2020-01-31")
  .startOf("day")
  .add(1, "months")
  .format("YYYY-MM-DD");
const threeMonths = moment("2020-02-01")
  .startOf("day")
  .add(3, "month")
  .format("YYYY-MM-DD");
const sixMonths = moment("2020-01-31")
  .startOf("day")
  .add(6, "month")
  .format("YYYY-MM-DD");

const arrTotal = [
  {
    title: "Total Revenue",
    value: "53,231,231",
    color: getRandomGradient(),
  },
  {
    title: "Room Revenue",
    value: "231,456,234",
    color: getRandomGradient(),
  },
  {
    title: "F&B Revenue",
    value: "412,556,342",
    color: getRandomGradient(),
  },
  {
    title: "Total Rooms Sold",
    value: "23",
    color: getRandomGradient(),
  },
];
function Chart() {
  const [selectedOptions, setSelectedOptions] = useState<string>("1 Month");
  const handleChange = (value: string) => {
    setSelectedOptions(value);
  };
  const filteredData = data1.filter((item) => {
    const itemDate = item.date;
    switch (selectedOptions) {
      case "1 Month":
        if (moment(itemDate).isBetween(today, oneMonth, undefined, "[]")) {
          return true;
        }
        break;
      case "3 Months":
        if (moment(itemDate).isBetween(today, threeMonths, undefined, "[]")) {
          return true;
        }
        break;
      case "6 Months":
        if (moment(itemDate).isBetween(today, sixMonths, undefined, "[]")) {
          return true;
        }
        break;
      default:
        if (moment(itemDate).isBetween(today, oneMonth, undefined, "[]")) {
          return true;
        }
        break;
    }
  });
  const dataValue = {
    totalOcc: filteredData.map((item) => item.totalOcc),
    arrRooms: filteredData.map((item) => item.arrRooms),
    depRooms: filteredData.map((item) => item.depRooms),
  };
  const data = {
    labels: filteredData.map((item) => moment(item.date).format("MMM DD")),
    datasets: [
      {
        label: "Total Occ.",
        data: dataValue.totalOcc,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
      {
        label: "Arr.Rooms",
        data: dataValue.arrRooms,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 1,
      },
      {
        label: "Dep.Rooms",
        data: dataValue.depRooms,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {arrTotal.map((item, index) => {
          return (
            <div className="flex justify-center" key={index}>
              <CardCustom
                title={item.title}
                money={item.value}
                bgWave={item.color}
              />
            </div>
          );
        })}
      </div>

      <main className="">
        <div className="border-r-[1px] ">
          <div className="p-4">
            <div className="text-[rgb(21, 41, 53)] font-bold"></div>
          </div>
        </div>
        <div className="w-full px-3 py-3 shadow mt-3">
          <div className="flex justify-end">
            <Select
              allowClear
              style={{ width: "10%" }}
              placeholder="Please select"
              onChange={handleChange}
              defaultValue={selectedOptions}
              options={[
                { label: "This Month", value: "1 Month" },
                { label: "3 Months", value: "3 Months" },
                { label: "6 Months", value: "6 Months" },
              ]}
            />
          </div>

          <Line data={data} options={options} />
        </div>
      </main>
    </>
  );
}

export default Chart;
