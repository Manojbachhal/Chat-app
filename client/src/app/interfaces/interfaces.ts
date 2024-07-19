export interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

export interface Contact {
  _id: string;
  contacts: User[];
  __v: number;
}
