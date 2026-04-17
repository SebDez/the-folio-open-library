import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  mapOpenLibraryAuthorDtoToAuthorModel,
  OpenLibraryAuthorDto,
} from '../mappers/open-library-author.mapper';
import { AuthorModel } from '../models/author.model';
import { AuthorProvider } from './author.provider';

@Injectable()
export class OpenLibraryAuthorProvider implements AuthorProvider {
  constructor(private readonly httpClient: HttpClient) {}

  getByAuthorId(authorId: string): Observable<AuthorModel> {
    const normalizedAuthorId = this.normalizeAuthorId(authorId);
    return this.httpClient
      .get<OpenLibraryAuthorDto>(`https://openlibrary.org/authors/${normalizedAuthorId}.json`)
      .pipe(
        map((response) =>
          mapOpenLibraryAuthorDtoToAuthorModel(
            response,
            this.normalizeAuthorId(response.key ?? normalizedAuthorId),
          ),
        ),
      );
  }

  private normalizeAuthorId(value: string): string {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return '';
    }

    return trimmedValue.replace(/^\/authors\//, '');
  }
}
