import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import { config } from 'dotenv';

config(); // Load env variables

const app = express();
const PORT = 3000;

// Connect to MongoDB if URI is provided
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided. Running with mocked data mode.');
}

// Security & Utility Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for Vite Dev Server
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API ROUTES ---

// Mock Products
const mockProducts = [
  { _id: '1', name: 'MacBook Pro 16"', brand: 'Apple', category: 'Laptops', price: 2499, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Powerful laptop for creators.', inStock: true, stockQuantity: 15 },
  { _id: '2', name: 'Dell XPS 15', brand: 'Dell', category: 'Laptops', price: 1899, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'InfinityEdge display and premium build.', inStock: true, stockQuantity: 22 },
  { _id: '3', name: 'Lenovo ThinkPad X1', brand: 'Lenovo', category: 'Laptops', price: 1599, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'The ultimate business laptop.', inStock: true, stockQuantity: 30 },
  { _id: '4', name: 'Alienware Aurora R15', brand: 'Dell', category: 'Gaming PCs', price: 2999, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'High performance gaming desktop.', inStock: true, stockQuantity: 5 },
];

app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Mock Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@penwema.com' && password === 'admin') {
    res.json({ token: 'mock-jwt-token-admin', user: { name: 'Admin User', role: 'admin' } });
  } else {
    res.json({ token: 'mock-jwt-token', user: { name: 'Test User', role: 'customer' } });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PenWema E-Commerce API is running' });
});

// --- VITE DEV SERVER & SPA FALLBACK ---
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
