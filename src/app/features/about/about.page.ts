import { Component } from '@angular/core';

import { AuthorModel } from '../../core/authors/models/author.model';
import { AuthorDisplayComponent } from '../author/components/author-display/author-display.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AuthorDisplayComponent],
  templateUrl: './about.page.html',
})
export class AboutPage {
  protected readonly currentAuthor: AuthorModel = {
    id: 'about-bio',
    name: 'Sébastien Dez',
    birthDate: '1991-07-25',
    bio: "Développeur Fullstack JavaScript avec 12 ans d'expérience, j'allie la rigueur du Clean Code à une approche humaine du mentoring (scrum master, accompagnement juniors). Mon expertise (Vue.js, NestJS, Angular, Nuxt) est au service de la création de solutions durables et du partage de connaissances au sein des équipes. J’applique une approche d’Artisan Développeur basée sur la \"Bienvaillance\" : l’équilibre entre la bienveillance humaine (mentoring, écoute utilisateur) et la vigilance technique (rigueur, maintenance, performance). Mon objectif : délivrer de la valeur métier durable au travers d’un code propre et d’une culture d'amélioration continue.",
  };

  protected readonly photoUrl = 'https://avatars.githubusercontent.com/u/10667575?v=4';
}
