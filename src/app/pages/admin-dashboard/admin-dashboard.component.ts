import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { GravitaService } from '../../Services/gravita.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  template: `
    <div class="container">
      <h1>Admin Dashboard</h1>
      <div class="actions">
        <button mat-raised-button color="primary" routerLink="/admin/new">
          <mat-icon>add</mat-icon> Create New Article
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon> Logout
        </button>
      </div>

      <mat-card class="mt-4">
        <mat-card-header>
          <mat-card-title>Articles</mat-card-title>
        </mat-card-header>
        <mat-list>
          <mat-list-item *ngFor="let article of articles" (click)="editArticle(article.docId)">
            <mat-icon matListItemIcon>article</mat-icon>
            <div matListItemTitle>{{ article.prompt || 'Untitled' }}</div>
            <div matListItemLine>{{ article.status?.startTime | date:'medium' }}</div>
            <button mat-icon-button matListItemMeta>
              <mat-icon>edit</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { padding: 50px; max-width: 800px; margin: 0 auto; }
    .actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .mt-4 { margin-top: 1rem; }
    mat-list-item { cursor: pointer; }
    mat-list-item:hover { background-color: rgba(0,0,0,0.04); }
  `]
})
export class AdminDashboardComponent implements OnInit {
  gravita = inject(GravitaService);
  auth = inject(AuthService);
  articles: any[] = [];

  router = inject(Router);

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    this.articles = await this.gravita.getArticles();
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  editArticle(id: string) {
    this.router.navigate(['/admin/edit', id]);
  }
}
