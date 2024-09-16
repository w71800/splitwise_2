export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type Record = {
  id: string;
  title: string;
  value: number | string;
  fullDate: string;
  participants: Member[];
  payers: Member[];
  method: 'equal' | 'fixed' | 'percentage' | 'ratio';
}