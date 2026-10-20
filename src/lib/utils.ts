export const photoComposition = [
  "inset-0",
  "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
  "right-0 bottom-0",
  "left-0 bottom-0",
  "right-0 top-0",
];

export const masters = [
  {name: "Андрей", id: "tan"},
  {name: "Соня", id: "sonya"},
  {name: "Артур", id: "arthur"},
];

export type VkReview = {
  id: number;
  text: string;
  date: number; // unix-время
  authorName: string;
  authorPhoto?: string;
  vkHref?: string;
};