import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GravitaService } from '../Services/gravita.service';

export const articleResolver: ResolveFn<any> = async (route, state) => {
  const gravita = inject(GravitaService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/blog']);
    return null;
  }

  const article = await gravita.getArticleById(id);
  
  if (article) {
    return article;
  }
  
  router.navigate(['/blog']);
  return null;
};
