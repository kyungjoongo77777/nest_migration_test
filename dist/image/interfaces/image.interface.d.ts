import { Document } from 'mongoose';
export interface Image extends Document {
    imageLocation: string;
    createdDate: string;
    isWarning: boolean;
    frameDesc: string;
    frameEngDesc: string;
    weaponType: string;
    streamId: string;
    uid: string;
}
