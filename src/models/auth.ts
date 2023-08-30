import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
});

export const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
