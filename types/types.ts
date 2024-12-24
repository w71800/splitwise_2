/**
 * @todo:
 * - 將 payers 改為多人
 */

export interface Group {
  id: string;
  strapiId: number;
  name: string;
  avatar?: string;
  members: User[];
}

export interface User {
  id: string; // strapi 的對外 documentId，例如 asdzxcasd2
  strapiId: number; // strapi 的對內存取 id，例如 3
  displayName: string;
  email?: string;
  avatar: string | null;
  groups?: Group[];
  friends?: User[];
}

export interface Participant extends User {
  tags?: string[];
}

export interface Division extends Pick<User, 'id' | 'strapiId' | 'displayName' | 'avatar'> {
  value: number;
}

export interface Payer extends User {
  paid: number;
}

export interface Record {
  id: string;
  title: string;
  value: number | null;
  currency: string;
  fullDate: Date;
  participants: Participant[];
  divisions: Division[];
  payers: Payer; // NOTE: 從 strapi 會拿到一個 payers list，但目前只會有一個 payer。
  splitor: 'equal' | 'fixed' | 'percentage' | 'ratio';
  group: Group | null;
  isSettlement?: boolean;
}

export interface Debt {
  id: string;
  displayName: string;
  shouldPay: number;
  debt: number;
  avatar: string | null;
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

export interface Settlement {
  creator: Pick<User, 'id' | 'strapiId' | 'displayName'>
  debtor: Pick<User, 'id' | 'strapiId' | 'displayName'>
  creditor: Pick<User, 'id' | 'strapiId' | 'displayName'>
  value: number
  currency: 'TWD' | 'JPY' | 'USD'
}