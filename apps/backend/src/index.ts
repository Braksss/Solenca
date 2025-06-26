import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import missionsRouter from './routes/missions';
import paymentsRouter from './routes/payments';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://super-duper-system-v6pv9pwrj954hw9pw-3000.app.github.dev',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/missions', missionsRouter);
app.use('/api/payments', paymentsRouter);

// ✅ Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch((err: unknown) => console.error('❌ Erreur MongoDB:', err));

// ✅ Lancement serveur
app.listen(3000, () => {
  console.log('🟢 API Solenca sur http://localhost:3000');
});