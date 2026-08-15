import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GravitaService } from '../Services/gravita.service';
import { from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const articleResolver: ResolveFn<any> = (route, state) => {
  const gravita = inject(GravitaService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/blog']);
    return of(null);
  }

  return from(gravita.getArticleById(id)).pipe(
    map(article => {
      if (article) {
        return article;
      }
      router.navigate(['/blog']);
      return null;
    }),
    catchError(() => {
      router.navigate(['/blog']);
      return of(null);
    })
  );
};
