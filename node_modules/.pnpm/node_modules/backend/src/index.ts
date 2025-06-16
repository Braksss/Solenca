import express from 'express';
import paymentsRouter from './routes/payments';

const app = express();
app.use(express.json());
app.use('/api/payments', paymentsRouter);

app.listen(3000, () => console.log('API running on http://localhost:3000'));
