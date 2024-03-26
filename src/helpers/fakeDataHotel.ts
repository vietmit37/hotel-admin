import { IActual, PropertyValues } from "@/models/IActual";

function generateFakeHotelData(pro: PropertyValues): IActual {
  return {
    property: pro,
    totalRoomInHotel: Math.floor(Math.random() * 1000),
    roomRevenue: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    fAndBRevenue: Math.floor(Math.random() * 10000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    otherRevenue: Math.floor(Math.random() * 5000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    totalRevenue: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    occPercentage: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    adr: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    hotelRoom: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    availableRooms: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    occupiedRoom: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    groupRooms: Math.floor(Math.random() * 2000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    transientRooms: Math.floor(Math.random() * 30).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };
}
export default generateFakeHotelData;
