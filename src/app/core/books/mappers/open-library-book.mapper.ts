import { BookModel } from '../models/book.model';

export interface OpenLibraryBookDto {
  key?: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export function mapOpenLibraryBookDtoToBookModel(doc: OpenLibraryBookDto): BookModel {
  return {
    id: doc.key ?? '',
    title: doc.title,
    authors: doc.author_name ?? [],
    coverId: doc.cover_i,
    publishYear: doc.first_publish_year,
  };
}
