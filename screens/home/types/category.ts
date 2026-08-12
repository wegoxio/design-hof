export type RoomCategory = {
  id: string;
  label: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
  roomIds: string[];
};
