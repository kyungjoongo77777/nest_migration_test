import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
    imageLocation: String,
    createdDate: String,
    isWarning: Boolean,
    frameDesc: String,
    frameEngDesc: String,
    weaponType: String,
    streamId : String,
    uid: String,
});
