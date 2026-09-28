export interface WishItem {
  id: string;
  sender: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
}

export interface MemoryPolaroid {
  id: string;
  imageUrl: string;
  caption: string;
  dateTag: string;
  rotation: number;
}

export interface Compliment {
  id: string;
  title: string;
  text: string;
  emoji: string;
}
