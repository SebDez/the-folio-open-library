import { AuthorModel } from '../models/author.model';

interface OpenLibraryAuthorBioDto {
  value?: string;
}

export interface OpenLibraryAuthorDto {
  key?: string;
  name?: string;
  bio?: string | OpenLibraryAuthorBioDto;
  birth_date?: string;
  death_date?: string;
  photos?: number[];
}

export function mapOpenLibraryAuthorDtoToAuthorModel(
  author: OpenLibraryAuthorDto,
  normalizedId: string,
): AuthorModel {
  return {
    id: normalizedId,
    name: author.name,
    bio: typeof author.bio === 'string' ? author.bio : author.bio?.value,
    birthDate: author.birth_date,
    deathDate: author.death_date,
    photoId: author.photos?.find((photoId) => typeof photoId === 'number'),
  };
}
