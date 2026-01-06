
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories';
  image: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
