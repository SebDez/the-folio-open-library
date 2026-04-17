export interface BookModel {
  id: string;
  title?: string;
  authors: string[];
  authorIds?: string[];
  coverId?: number;
  publishYear?: number;
}

export interface BookDetailsModel extends BookModel {
  description?: string;
  subjects: string[];
}
