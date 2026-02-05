
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Home' | 'Lifestyle' | 'Wearables';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
