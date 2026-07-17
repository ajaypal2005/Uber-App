const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Auto-delete after 1 hour (matches JWT expiry)
    }
});

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = blacklistTokenModel;
