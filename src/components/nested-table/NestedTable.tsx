"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import * as XLSX from "xlsx";

interface ExpandedDataType {
  key: React.Key;
  room: string;
  guest: string;
  count1: string;
  pax: string;
  time: string;
  pkg: string;
  remarks: string;
}
interface DataType {
  key: React.ReactNode;
  date?: string;
  rvc?: string;
  period?: string;
  aCount?: number;
  cCount?: number;
  aSales?: string;
  cSales?: number;
  count?: number;
  countPer?: string;
  sales?: number;
  salesPer?: string;
  children?: DataType[];
  expandedRowRender?: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    fixed: "left",
  },
  {
    title: "RVC",
    dataIndex: "rvc",
    key: "rvc",
  },
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },
  {
    title: "A.Count",
    dataIndex: "aCount",
    key: "aCount",
  },
  {
    title: "C.Count",
    dataIndex: "cCount",
    key: "cCount",
  },
  {
    title: "A.Sales",
    dataIndex: "aSales",
    key: "aSales",
  },
  {
    title: "C.Sales",
    dataIndex: "cSales",
    key: "cSales",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Count %",
    dataIndex: "countPer",
    key: "countPer",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Sales %",
    dataIndex: "salesPer",
    key: "salesPer",
  },
  {
    title: "expandedRowRender %",
    dataIndex: "expandedRowRender",
    key: "expandedRowRender",
    hidden: true,
  },
];
const data: DataType[] = [
  {
    key: 1,
    date: "2020-01-01",
    rvc: "",
    period: "",
    aCount: 1000,
    cCount: 2,
    aSales: "7,750,222",
    cSales: 4,
    count: 5,
    countPer: "6%",
    sales: 7,
    salesPer: "8%",
    children: [
      {
        key: 11,
        rvc: "RVC1",
        aCount: 1,
        cCount: 2,
        aSales: "3",
        cSales: 4,
        count: 5,
        countPer: "6%",
        sales: 7,
        salesPer: "8%",
        children: [
          {
            key: 2,
            period: "Morning",
            aCount: 1,
            cCount: 2,
            aSales: "3",
            cSales: 4,
            count: 5,
            countPer: "6%",
            sales: 7,
            salesPer: "8%",
            children: [],
          },
          {
            key: 112,
            period: "Afternoon",
            children: [],
          },
          {
            key: 113,
            period: "Evening",
          },
        ],
      },
    ],
  },
];
const table2 = [
  {
    period: "room",
    aCount: "guest",
    cCount: "count1",
    aSales: "pax",
    cSales: "time",
    count: "pkg",
    countPer: "remarks",
  },
];
const morningColumns: TableColumnsType<ExpandedDataType> = [
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "Guest",
    dataIndex: "guest",
    key: "guest",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Pax",
    dataIndex: "pax",
    key: "pax",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Pkg",
    dataIndex: "pkg",
    key: "pkg",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
];
const morningData: ExpandedDataType[] = [
  {
    key: "1",
    room: "1111",
    guest: "This is guest name",
    count1: "2",
    pax: "This is pax",
    time: "11:00",
    pkg: "This is package",
    remarks: "",
  },
];
const expandedRowRender = (record: DataType) => {
  const morningChild = record.children?.length === 0;
  if (morningChild) {
    return (
      <Table
        columns={morningColumns}
        dataSource={morningChild ? morningData : []}
        pagination={false}
      />
    );
  }

  return null;
};
const App: React.FC = () => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    // Create a json data has nested data
    const flattenData = (data: DataType[]) => {
      return data.reduce((flatData: any, item) => {
        const { children, ...rest } = item;

        flatData.push(rest);
        delete rest.key;
        if (children) {
          flatData.push(...flattenData(children));
        }

        if (children?.length === 0) {
          // delete table  before push
          const newTable = table2.slice(0, 1);
          morningData.forEach((item) => {
            newTable.push({
              period: item.room,
              aCount: item.guest,
              cCount: item.count1,
              aSales: item.pax,
              cSales: item.time,
              count: item.pkg,
              countPer: item.remarks,
            });
          });
          return [...flatData, ...newTable];
        }
        return flatData;
      }, []);
    };
    const ws = XLSX.utils.json_to_sheet(flattenData(data));
    XLSX.utils.book_append_sheet(wb, ws, "Data1");
    const excelFileName = "data.xlsx";
    XLSX.writeFile(wb, excelFileName);
  };

  return (
    <>
      <button
        className="bg-green-200 border border-green-500 px-2 py-3  rounded my-3 hover:bg-green-300"
        onClick={exportToExcel}
      >
        Export to Excel
      </button>

      <Table
        columns={columns}
        scroll={{ x: 1500 }}
        dataSource={data}
        expandedRowRender={expandedRowRender}
      />
    </>
  );
};

export default App;
