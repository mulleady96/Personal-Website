import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { GravitaService } from '../../../Services/gravita.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    QuillModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <button mat-icon-button routerLink="/admin">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>{{ isEditMode ? 'Edit Article' : 'New Article' }}</h1>
      </div>

      <mat-card class="editor-card">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Prompt / Title</mat-label>
          <input matInput [(ngModel)]="article.prompt" placeholder="Enter title or prompt">
        </mat-form-field>

        <p class="label">Content (Rich Text)</p>
        <quill-editor 
          [(ngModel)]="article.response" 
          [styles]="{height: '400px'}"
          placeholder="Start writing..."
          class="quill-editor">
        </quill-editor>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="save()">
            <mat-icon>save</mat-icon> Save
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { padding: 50px; max-width: 1000px; margin: 0 auto; }
    .header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
    .full-width { width: 100%; }
    .editor-card { padding: 20px; }
    .actions { margin-top: 20px; display: flex; justify-content: flex-end; }
    .label { margin-bottom: 8px; font-weight: 500; }
  `]
})
export class EditorComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  gravita = inject(GravitaService);

  isEditMode = false;
  articleId: string | null = null;
  article: any = {
    prompt: '',
    response: '',
    status: { state: 'completed' } // Default status
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const data = this.route.snapshot.data['article'];
    
    if (id && data) {
      this.isEditMode = true;
      this.articleId = id;
      this.article = data;
    }
  }

  async save() {
    if (this.isEditMode && this.articleId) {
      await this.gravita.updateArticle(this.articleId, this.article);
    } else {
      await this.gravita.createArticle(this.article);
    }
    this.router.navigate(['/admin']);
  }
}
