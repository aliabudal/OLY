export interface ProductType {
  id: number;
  product_id: number;
  product_name: string;
  stock: number;
  price: number;
  product_images: string;
  product_image: string;
  user: UserType;
  address: string;
}

export interface UserType {
  user_id: number;
  name: string;
  address: string;
  profilepicture: string;
}
