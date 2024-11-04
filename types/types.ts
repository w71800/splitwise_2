/**
 * @todo:
 * - 將 payers 改為多人
 */

export interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: User[];
}

export interface User {
  id: string;
  displayName: string;
  email?: string;
  avatar?: string;
  groups?: Group[];
  friends?: User[];
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
  currency: string;
  fullDate: Date;
  participants: Participant[];
  divisions: Division[];
  payers: Payer; // NOTE: 從 strapi 會拿到一個 payers list，但目前只會有一個 payer。
  splitor: 'equal' | 'fixed' | 'percentage' | 'ratio';
  group: { 
    id: string;
    name: string;
    members: User[];
  } | null;
}

export interface Debt {
  id: string;
  displayName: string;
  shouldPay: number;
  debt: number;
  creditor: {
    id: string;
    displayName: string;
    paid: number;
  };
}

export interface Summary {
  partial: {
    id: string
    displayName: string
    status: DebtStatus
    value: number
  }[]
  total: {
    id: string
    displayName: string
    status: DebtStatus
    value: number
  }[]
}