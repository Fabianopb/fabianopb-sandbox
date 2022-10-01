export type Skill = {
  _id: string;
  name: string;
  value: number;
  type: 'skill' | 'tool';
};

export type Badge = {
  _id: string;
  name: string;
  imageSrc: string;
  href: string;
};
