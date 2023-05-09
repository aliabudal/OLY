export interface ProductType {
  id: number;
  product_id: number;
  name: string;
  stock: number;
  price: number;
  image: string;
  user: UserType;
  address: string;
  category: string;
  description: string;
}

export interface UserType {
  user_id: number;
  name: string;
  address: string;
  image: string;
}
