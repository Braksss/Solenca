import mongoose from 'mongoose';

const MissionSchema = new mongoose.Schema({
  maison: String,
  adresse: String,
  date: String,
  checklist: [String],
  photos: [String],
  commentaire: String,
  statut: {
    type: String,
    enum: ['faite', 'à faire'],
    default: 'à faire'
  }
});

const Mission = mongoose.model('Mission', MissionSchema);
export default Mission;