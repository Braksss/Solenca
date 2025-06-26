import express from 'express';
import Mission from '../models/Mission';

const router = express.Router();

router.get('/', async (_req, res) => {
  const missions = await Mission.find();
  res.json(missions);
});

router.post('/', async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(400).json({ message: 'Erreur', error: err });
  }
});

export default router;