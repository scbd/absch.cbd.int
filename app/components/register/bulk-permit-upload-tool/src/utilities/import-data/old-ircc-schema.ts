// Define interfaces for complex objects
interface IFields {
  language: string;
  country: string;
  cna: string;
  permit_equivalent: string;
  date_of_issuance: string;
  dateOfExpiry: string;
  provider: IContactFields;
  pic: IContactFields;
  matConset: string;
  subject_matter: string;
  keywords: string;
  specimens: string;
  taxonomies: string;
  usage: string;
  usageDescription: string;
  conditions_third_party_transfer: string;
  permitFiles: string;
  additional_information: string;
}

interface IContactFields {
  type: string;
  existing: string;
  orgName_firstName: string;
  acronym_lastName: string;
  address: string;
  city: string;
  country: string;
  email: string;
  consent?: string;
}

interface ICache {
  fields: {
    C: { [key: string]: any };
  };
}

export default {
  fields: {
    language: 'A',
    country: 'B',
    cna: 'C',
    permit_equivalent: 'D',
    date_of_issuance: 'E',
    dateOfExpiry: 'F',
    provider: {
      type: 'G',
      existing: 'H',
      orgName_firstName: 'I',
      acronym_lastName: 'J',
      address: 'K',
      city: 'L',
      country: 'M',
      email: 'N',
    },
    pic: {
      consent: 'O',
      type: 'P',
      existing: 'Q',
      orgName_firstName: 'R',
      acronym_lastName: 'S',
      address: 'T',
      city: 'U',
      country: 'V',
      email: 'W',
    },
    matConset: 'X',
    subject_matter: 'Y',
    keywords: 'Z',
    specimens: 'AA',
    taxonomies: 'AB',
    usage: 'AC',
    usageDescription: 'AD',
    conditions_third_party_transfer: 'AE',
    permitFiles: 'AF',
    additional_information: 'AG',
  } satisfies IFields,

  cache: {
    fields: {
      C: {},
    },
  } satisfies ICache,

  countries: [], // Replace with actual type if known
  authorityIds: [],
  contacts: [], // Replace with actual type if known
  hashedValue: {},
}
