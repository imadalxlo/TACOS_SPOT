import { Language, Translation, Product } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    nav: { home: 'Home', menu: 'Menu', contact: 'Location', cart: 'Cart' },
    hero: { title: 'AUTHENTIC FRENCH TACOS', subtitle: 'The real taste of Lyon in Bialystok', cta: 'ORDER NOW' },
    menu: { title: 'Our Menu', sizes: 'Choose Size', meats: 'Choose Meats', sauces: 'Choose Sauces', addToCart: 'Add to Order', custom: 'Build Your Own', panini: 'Crispy Paninis' },
    cart: { title: 'Your Order', empty: 'Your cart is empty', total: 'Total', checkout: 'Checkout', deliveryDetails: 'Delivery Details', name: 'Name', address: 'Address', phone: 'Phone Number', placeOrder: 'Confirm Order', success: 'Order Sent! We will call you shortly.' },
    ai: { title: 'Sauce Sommelier', prompt: 'Not sure what to pick? Tell our AI what flavors you like!', placeholder: 'e.g., Spicy, Creamy, Cheesy...', button: 'Get Recommendation', result: 'Chef Suggests:' }
  },
  fr: {
    nav: { home: 'Accueil', menu: 'Carte', contact: 'Infos', cart: 'Panier' },
    hero: { title: 'TACOS FRANÇAIS AUTHENTIQUE', subtitle: 'Le vrai goût de Lyon à Bialystok', cta: 'COMMANDER' },
    menu: { title: 'La Carte', sizes: 'Taille', meats: 'Viandes', sauces: 'Sauces', addToCart: 'Ajouter', custom: 'Crée ton Tacos', panini: 'Nos Paninis' },
    cart: { title: 'Votre Commande', empty: 'Panier vide', total: 'Total', checkout: 'Commander', deliveryDetails: 'Livraison', name: 'Nom', address: 'Adresse', phone: 'Téléphone', placeOrder: 'Valider', success: 'Commande envoyée ! On vous appelle.' },
    ai: { title: 'Sommelier des Sauces', prompt: 'Hésitant ? Demandez à l\'IA !', placeholder: 'ex: Épicé, Crémeux, Fromager...', button: 'Conseille-moi', result: 'Le Chef Suggère :' }
  },
  pl: {
    nav: { home: 'Start', menu: 'Menu', contact: 'Kontakt', cart: 'Koszyk' },
    hero: { title: 'PRAWDZIWE FRANCUSKIE TACOS', subtitle: 'Smak Lyonu w Białymstoku', cta: 'ZAMÓW TERAZ' },
    menu: { title: 'Nasze Menu', sizes: 'Wybierz Rozmiar', meats: 'Mięsa', sauces: 'Sosy', addToCart: 'Dodaj', custom: 'Skomponuj Własne', panini: 'Chrupiące Panini' },
    cart: { title: 'Twój Koszyk', empty: 'Koszyk jest pusty', total: 'Suma', checkout: 'Do Kasy', deliveryDetails: 'Dostawa', name: 'Imię', address: 'Adres', phone: 'Telefon', placeOrder: 'Zamów', success: 'Zamówienie wysłane! Zadzwonimy wkrótce.' },
    ai: { title: 'Doradca Sosów', prompt: 'Nie wiesz co wybrać? Zapytaj AI!', placeholder: 'np. Ostre, Kremowe, Serowe...', button: 'Doradź mi', result: 'Szef Poleca:' }
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'tacos-m',
    name: 'Tacos M',
    description: '1 Meat + Fries + Cheese Sauce',
    price: 25,
    image: 'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?auto=format&fit=crop&q=80&w=800',
    category: 'tacos',
    customizable: true
  },
  {
    id: 'tacos-l',
    name: 'Tacos L',
    description: '2 Meats + Fries + Cheese Sauce',
    price: 32,
    image: 'https://images.unsplash.com/photo-1552332386-f8dd003f96a2?auto=format&fit=crop&q=80&w=800',
    category: 'tacos',
    customizable: true
  },
  {
    id: 'tacos-xl',
    name: 'Tacos XL',
    description: '3 Meats + Fries + Cheese Sauce',
    price: 40,
    image: 'https://images.unsplash.com/photo-1683495804369-029497063c7b?auto=format&fit=crop&q=80&w=800',
    category: 'tacos',
    customizable: true
  },
  {
    id: 'panini-chk',
    name: 'Panini Chicken',
    description: 'Grilled chicken, mozzarella, tomato',
    price: 18,
    image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?auto=format&fit=crop&q=80&w=800',
    category: 'panini'
  },
  {
    id: 'panini-beef',
    name: 'Panini Beef',
    description: 'Minced beef, cheddar, onion',
    price: 20,
    image: 'https://images.unsplash.com/photo-1606502973842-f64bc2f6d054?auto=format&fit=crop&q=80&w=800',
    category: 'panini'
  }
];

export const SAUCES = ['Algérienne', 'Samouraï', 'Blanche', 'Barbecue', 'Biggy', 'Curry', 'Cheese', 'Mayo', 'Ketchup', 'Harissa'];
export const MEATS = ['Chicken / Kurczak / Poulet', 'Minced Beef / Wołowina / Boeuf Haché', 'Nuggets', 'Tenders', 'Cordon Bleu'];

export const LOGO_URL = "https://i.ibb.co/6803875/image.png"; // User provided logo url
