/**
 * @todo:
 * - 將 payers 改為多人
 */

export interface User {
  id: string;
  displayName: string;
  email?: string;
  avatar?: string;
}

export interface Participant extends User {
  tags?: string[];
}

export interface Division extends User {
  value: number;
}

export interface Payer extends User {
  paid: number;
}

export interface Record {
  id: string;
  title: string;
  value: number;
  fullDate: string;
  payers: Payer;
  participants: Participant[];
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