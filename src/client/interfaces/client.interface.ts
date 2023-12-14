import { Document } from 'mongoose';

export interface Client extends Document {
    author: string,
    age: string,
    body: string,
    createdAt: string,
}
