"use client";

import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { Divider, Select, Table, Typography } from "antd";
import { SelectProps } from "antd/lib";
import { IActual, PropertyValues } from "@/models/IActual";
import { generateFakeHotelData } from "@/helpers";
import { numberToMoney } from "@/helpers";

const { Text } = Typography;

const columns: TableColumnsType<IActual> = [
  {
    title: "Property",
    dataIndex: "property",
    render: (text: string) => <a>{text}</a>,
    fixed: "left",
  },
  {
    title: "Total Room in Hotel",
    dataIndex: "totalRoomInHotel",
  },
  {
    title: "Room Revenue",
    dataIndex: "roomRevenue",
  },
  {
    title: "F&B Revenue",
    dataIndex: "fAndBRevenue",
  },
  {
    title: "Other Revenue",
    dataIndex: "otherRevenue",
  },
  {
    title: "Total Revenue",
    dataIndex: "totalRevenue",
  },
  {
    title: "Occupancy Percentage",
    dataIndex: "occPercentage",
  },
  {
    title: "ADR",
    dataIndex: "adr",
  },
  {
    title: "Hotel Room",
    dataIndex: "hotelRoom",
  },
  {
    title: "Available Rooms",
    dataIndex: "availableRooms",
  },
  {
    title: "Occupied Room",
    dataIndex: "occupiedRoom",
  },
  {
    title: "Group Rooms",
    dataIndex: "groupRooms",
  },
  {
    title: "Transient Rooms",
    dataIndex: "transientRooms",
  },
];

const data: IActual[] = [];
for (let i = 0; i < Object.values(PropertyValues).length; i++) {
  data.push(generateFakeHotelData(Object.values(PropertyValues)[i]));
}

const Actual: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options: SelectProps["options"] = data.map((item) => ({
    label: item.property,
    value: item.property as string,
  }));

  const handleChange = (value: string[]) => {
    setSelectedOptions(value);
  };
  const filteredData = data.filter((item) =>
    selectedOptions.includes(item.property as string),
  );
  console.log(filteredData);
  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />

      <Divider />

      <Table
        virtual
        scroll={{ x: 1500 }}
        columns={columns}
        dataSource={filteredData}
        summary={(pageData) => {
          const sumProperty = (property: any) => {
            return pageData.reduce((sum, item: any) => {
              if (property === "totalRoomInHotel") {
                return sum + item[property];
              }
              return sum + Number(item[property].replace(/,/g, ""));
            }, 0);
          };

          const totalRoomInHotels = sumProperty("totalRoomInHotel");
          const totalfAndBRevenues = sumProperty("fAndBRevenue");
          const totalotherRevenues = sumProperty("otherRevenue");
          const totalRevenues = sumProperty("totalRevenue");
          const totaloccPercentages = sumProperty("occPercentage");
          const totaladrs = sumProperty("adr");
          const totalhotelRooms = sumProperty("hotelRoom");
          const totalavailableRooms = sumProperty("availableRooms");
          const totaloccupiedRoom = sumProperty("occupiedRoom");
          const totalgroupRooms = sumProperty("groupRooms");
          const totaltransientRooms = sumProperty("transientRooms");
          const toalroomRevenue = sumProperty("roomRevenue");

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell
                  index={0}
                  colSpan={1}
                  className="text-center"
                >
                  Grand Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Text type="danger">{totalRoomInHotels}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Text type="danger">{numberToMoney(toalroomRevenue)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text type="danger">{numberToMoney(totalfAndBRevenues)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <Text type="danger">{numberToMoney(totalotherRevenues)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <Text type="danger">{numberToMoney(totalRevenues)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <Text type="danger">
                    {numberToMoney(totaloccPercentages)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <Text type="danger">{numberToMoney(totaladrs)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9}>
                  <Text type="danger">{numberToMoney(totalhotelRooms)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text type="danger">
                    {numberToMoney(totalavailableRooms)}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={11}>
                  <Text type="danger">{numberToMoney(totaloccupiedRoom)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={12}>
                  <Text type="danger">{numberToMoney(totalgroupRooms)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={13}>
                  <Text type="danger">
                    {numberToMoney(totaltransientRooms)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default Actual;
