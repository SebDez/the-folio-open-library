import { BookDetailsModel, BookModel } from '../models/book.model';

export interface OpenLibraryBookDto {
  key?: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface OpenLibraryBookDetailDescriptionDto {
  value?: string;
}

interface OpenLibraryBookDetailAuthorDto {
  key?: string;
}

export interface OpenLibraryBookDetailDto {
  key?: string;
  title?: string;
  description?: string | OpenLibraryBookDetailDescriptionDto;
  authors?: OpenLibraryBookDetailAuthorDto[];
  covers?: number[];
  subjects?: string[];
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

export function mapOpenLibraryBookDetailDtoToBookDetailsModel(
  book: OpenLibraryBookDetailDto,
  normalizedId: string,
): BookDetailsModel {
  return {
    id: normalizedId,
    title: book.title,
    authors: book.authors?.map((author) => author.key ?? '') ?? [],
    coverId: book.covers?.find((coverId) => typeof coverId === 'number'),
    description: typeof book.description === 'string' ? book.description : book.description?.value,
    subjects: book.subjects ?? [],
  };
}
