export interface Person {
  name: string;
  email: string;
  acceptedTac: boolean;
}

export interface Score extends Person {
  score: number;
  date: string;
}
