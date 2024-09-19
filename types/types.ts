/**
 * @todo:
 * - 將 payers 改為多人
 */

export interface Member {
  id: string;
  displayName: string;
  email: string;
}

export interface Division extends Member {
  value: number;
}

export interface Payer extends Member {
  paid: number;
}

export interface Record {
  id: string;
  title: string;
  value: number;
  fullDate: string;
  payers: Payer;
  participants: Member[];
  divisions: Division[];
  splitor: 'equal' | 'fixed' | 'percentage' | 'ratio';
}

export interface Debt {
  id: string;
  displayName: string;
  shouldPay: number;
  debt: number;
  creditorId: string | null;
}