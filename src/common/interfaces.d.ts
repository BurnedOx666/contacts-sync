export interface IContactData {
  contactNumber: string;
  countryCode?: string;
  contactName: string;
  createdAt?: number;
}

export interface IUserContacts {
  user_id: string;
  contacts: IContactData[];
}

export interface IEsContact {
  id: string;
  user_id: string;
  contact_number: number;
  country_code: number;
  full_contact: string;
  contact_name: string;
  is_invite_disabled: boolean;
  created_at: string;
  updated_at: string;
}
