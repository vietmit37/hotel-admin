export enum PropertyValues {
  ALL = "ALL",
  SPH = "SPH",
  PP02 = "PP02",
  SR01 = "SR01",
  SR02 = "SR02",
  SR03 = "SR03",
  SR04 = "SR04",
  SV01 = "SV01",
  SV02 = "SV02",
  SV03 = "SV03",
  SV04 = "SV04",
  KP01 = "KP01",
  KP02 = "KP02",
}
export interface IActual {
  property: PropertyValues;
  totalRoomInHotel: number;
  roomRevenue: string;
  fAndBRevenue: string;
  otherRevenue: string;
  totalRevenue: string;
  occPercentage: string;
  adr: string;
  hotelRoom: string;
  availableRooms: string;
  occupiedRoom: string;
  groupRooms: string;
  transientRooms: string;
}
