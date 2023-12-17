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

  export enum Gender {MALE ="MALE" ,FEMALE="FEMALE"}