import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';

export const ContactMapping: MappingTypeMapping = {
  properties: {
    id: { type: 'keyword' },
    user_id: { type: 'keyword' },
    contact_number: { type: 'long' },
    country_code: { type: 'integer' },
    full_contact: { type: 'text' },
    contact_name: { type: 'text', fielddata: true },
    is_invite_disabled: { type: 'boolean' },
    created_at: { type: 'date' },
    updated_at: { type: 'date' },
  },
};
