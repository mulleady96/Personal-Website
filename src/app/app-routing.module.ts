import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { GetInTouchComponent } from './pages/get-in-touch/get-in-touch.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';


// *Implement Lazy Loading.
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'enquire', component: GetInTouchComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'BlogDetail', component: BlogDetailComponent },
  { path: 'coming-soon', component: ComingSoonComponent },

];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
