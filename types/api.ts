/**
 * @description: 
 * - 對於要 post 到 strapi 的資料的接口定義
 */

interface User {
  id: number;
}

interface Participant {
  participant: User;
  tags: Tag[] | null;
}

interface Tag {
  tag: string;
}

interface Payer {
  payer: User;
  paid: number;
}

interface Division {
  participant: User;
  value: number;
}

interface Group {
  id: number;
}

export interface PostRecord {
  title: string;
  splitor: string;
  value: number;
  currency: 'TWD' | 'USD' | 'JPY';
  fullDate: string;
  participants: Participant[];
  payers: Payer[];
  divisions: Division[];
  group: Group | null;
}