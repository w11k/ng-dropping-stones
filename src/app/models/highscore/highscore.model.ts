export interface Person {
  name: string;
  email: string;
}

export interface Score extends Person {
  score: number;
  date: string;
}
