import { BookModel } from './book.model';

export interface BookSearchResultModel {
  books: BookModel[];
  total: number;
  skip: number;
  take: number;
}
