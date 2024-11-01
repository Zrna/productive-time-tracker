import { Attributes, Links, Meta, Relationships } from "./common";

export interface Services {
  data: {
    attributes: Attributes;
    id: string;
    relationships: Relationships;
    type: string;
  }[];
  links: Links;
  meta: Meta;
}
