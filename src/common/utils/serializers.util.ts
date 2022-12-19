import { IEsContact } from '@common/interfaces';
import { UserContactDocument } from '@schema/user_contact.schema';

export class SerializersUtil {

  static serializeContactDoc(doc: UserContactDocument): IEsContact {
    return {
      id: doc._id,
      user_id: doc.user_id,
      contact_name: doc.contact_name,
      contact_number: doc.contact_number,
      country_code: doc.country_code,
      full_contact: `+${doc.country_code}${doc.contact_number}`,
      is_invite_disabled: doc.is_invite_disabled,
      created_at: (doc as any).created_at,
      updated_at: (doc as any).updated_at,
    };
  }
}
