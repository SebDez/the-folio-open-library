export interface BookModel {
  id: string;
  title?: string;
  authors: string[];
  coverId?: number;
  publishYear?: number;
}

export interface BookDetailsModel extends BookModel {
  description?: string;
  subjects: string[];
}
