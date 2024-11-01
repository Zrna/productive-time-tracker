import { Attributes, Links, Meta, Relationships } from "./common";

export interface OrganizationMemberships {
  data: {
    attributes: Attributes;
    id: string;
    relationships: Relationships;
    type: string;
  }[];
  included?: {
    [key: PropertyKey]: any;
  }[];
  links: Links;
  meta: Meta;
}
