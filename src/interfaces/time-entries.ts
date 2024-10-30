import { Attributes, Links, Meta, Relationships } from './common';

interface TimeEntriesMeta extends Meta {
  organization_features: {
    [key: string]: {
      [key: string]: any;
    };
  };
}

export interface TimeEntries {
  data: {
    attributes: Attributes;
    id: string;
    relationships: Relationships;
    type: string;
  }[];
  links: Links;
  meta: TimeEntriesMeta;
}
