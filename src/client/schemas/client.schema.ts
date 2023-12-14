import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    author: String,
    age: String,
    body: String,
    createdAt: String,
});
