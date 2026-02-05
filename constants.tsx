
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aura Soundbar Pro',
    price: 499.99,
    description: 'Immersive 3D spatial audio with deep bass and minimalist design. Perfect for cinematic home experiences.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    stock: 12
  },
  {
    id: '2',
    name: 'Nebula Smart Watch',
    price: 249.00,
    description: 'Advanced health tracking, sapphire glass, and 7-day battery life. Stay connected with elegance.',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    stock: 25
  },
  {
    id: '3',
    name: 'Zen Desk Lamp',
    price: 89.99,
    description: 'Flicker-free adjustable LED lighting with wireless charging base. Designed for productivity and eye health.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    stock: 50
  },
  {
    id: '4',
    name: 'Vortex VR Headset',
    price: 599.00,
    description: 'Next-generation virtual reality with 8K resolution and ultra-low latency tracking.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    stock: 8
  },
  {
    id: '5',
    name: 'Luna Essential Oil Diffuser',
    price: 45.00,
    description: 'Ultrasonic aromatherapy diffuser with ambient mood lighting. Transform your space into a spa.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    stock: 100
  },
  {
    id: '6',
    name: 'Horizon Backpack',
    price: 120.00,
    description: 'Weatherproof premium canvas backpack with dedicated tech compartments and ergonomic support.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    stock: 30
  },
  {
    id: '7',
    name: 'Titan Gaming Mouse',
    price: 75.00,
    description: 'Lightweight honeycomb design with 26K DPI sensor and customizable RGB lighting.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-37a3c71cce49?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    stock: 42
  },
  {
    id: '8',
    name: 'Nova Smart Kettle',
    price: 135.00,
    description: 'Precision temperature control with smartphone integration. Perfect for the tea connoisseur.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    stock: 15
  }
];

export const CATEGORIES: string[] = ['All', 'Electronics', 'Home', 'Lifestyle', 'Wearables'];
