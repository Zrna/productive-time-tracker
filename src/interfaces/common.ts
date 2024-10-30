export interface Attributes {
  [key: string]: any;
}

export interface Relationships {
  [key: string]: {
    [key: string]: any;
  };
}

export interface Links {
  first: string;
  last: string;
}

export interface Meta {
  current_page: number;
  max_page_size: number;
  page_size: number;
  settings: {
    systemFlags: {
      [key: PropertyKey]: any;
    };
  };
  total_count: number;
  total_pages: number;
}
