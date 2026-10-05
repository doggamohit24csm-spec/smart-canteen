import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express server is running' });
});

app.get('/api/menu', (req, res) => {
  res.json({
    items: [
      { id: '1', name: 'Veg Burger', price: 60 },
      { id: '2', name: 'Grilled Sandwich', price: 40 },
      { id: '3', name: 'Masala Dosa', price: 50 },
      { id: '4', name: 'Cold Coffee', price: 30 },
    ],
  });
});

app.get('/api/orders', (req, res) => {
  res.json({
    orders: [
      { id: 'SB1039', token: 'B-14', total: 75, status: 'completed' },
      { id: 'SB1042', token: 'A-27', total: 90, status: 'preparing' },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
