import { UploadService } from './../../Services/upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { DropZoneDirective } from 'src/app/drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';


const routes: Routes = [
  {
    path: '',
    component: FileUploadComponent
  }
];

@NgModule({
  declarations: [FileUploadComponent,
    DropZoneDirective,
    FileSizePipe],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ],
})
export class FileUploadModule { }
