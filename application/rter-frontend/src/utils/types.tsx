export type CategoryItem = {
  name: string;
  items: string[];
};

export type Categories = CategoryItem[];

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  gender: Gender;
  address: string;
  description: string;
};

export type LoginRequest = {
  username: string;
  password: string;
}

export type PaymentRequest = {
  token: string;
  amount: number;
  currency: string;
  description: string;
  username: string;
  ngoName: string;
}

export type Donation = {
  id: number;
  amount: number;
  type: DonationType;
  details: string;
  createdat: Date;
  iduser: number;
  idngo: number;
}

export enum DonationType {
  Payment = "PAYMENT",
  Food = "FOOD",
  Item = "ITEM",
  Volunteer = "VOLUNTEER",
}

export type PaymentResponse = {
  status: string;
  message: string;
}

export enum Gender { MALE = "MALE", FEMALE = "FEMALE" }

export enum COLORS {
  DEEP_BLUE = "#1565C0",
  TEAL = "#009688",
  WHITE = "#FFFFFF",
  RED = "#FF0000",
  BLACK = "#000000",
};