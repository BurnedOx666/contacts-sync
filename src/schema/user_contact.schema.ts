import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Int32 } from 'mongodb';
import { Document } from 'mongoose';

@Schema({
  collection: 'user_contacts',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class UserContact {
  @Prop({ type: String })
  user_id: string;

  @Prop({ type: Int32 })
  contact_number: number;

  @Prop({ type: Int32 })
  country_code: number;

  @Prop({ type: String })
  contact_name: string;

  @Prop({ type: Boolean, default: false })
  is_invite_disabled: boolean;
}

export type UserContactDocument = UserContact & Document;

export const UserContactSchema = SchemaFactory.createForClass(UserContact);
