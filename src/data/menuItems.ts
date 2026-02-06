import pizzaImg from '@/assets/pizza.jpg';
import burgerImg from '@/assets/burger.jpg';
import pokeBowlImg from '@/assets/poke-bowl.jpg';
import wingsImg from '@/assets/wings.jpg';
import saladImg from '@/assets/salad.jpg';
import pastaImg from '@/assets/pasta.jpg';
import { MenuItem } from '@/types/order';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on a crispy crust',
    price: 14.99,
    image: pizzaImg,
    category: 'Pizza',
  },
  {
    id: '2',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    price: 12.99,
    image: burgerImg,
    category: 'Burgers',
  },
  {
    id: '3',
    name: 'Salmon Poke Bowl',
    description: 'Fresh salmon, avocado, edamame, rice, and sesame dressing',
    price: 16.99,
    image: pokeBowlImg,
    category: 'Bowls',
  },
  {
    id: '4',
    name: 'Crispy Chicken Wings',
    description: 'Golden fried wings with your choice of sauce',
    price: 11.99,
    image: wingsImg,
    category: 'Appetizers',
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Grilled chicken, romaine lettuce, croutons, and parmesan',
    price: 10.99,
    image: saladImg,
    category: 'Salads',
  },
  {
    id: '6',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, egg, and parmesan cheese',
    price: 15.99,
    image: pastaImg,
    category: 'Pasta',
  },
];
