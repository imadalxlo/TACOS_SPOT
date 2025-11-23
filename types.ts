export type Language = 'en' | 'fr' | 'pl';

export interface Translation {
  nav: {
    home: string;
    menu: string;
    contact: string;
    cart: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  menu: {
    title: string;
    sizes: string;
    meats: string;
    sauces: string;
    addToCart: string;
    custom: string;
    panini: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    deliveryDetails: string;
    name: string;
    address: string;
    phone: string;
    placeOrder: string;
    success: string;
  };
  ai: {
    title: string;
    prompt: string;
    placeholder: string;
    button: string;
    result: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tacos' | 'panini' | 'drink' | 'fries';
  customizable?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  selectedSauces?: string[];
  selectedMeats?: string[];
  size?: string;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  total: number;
}
