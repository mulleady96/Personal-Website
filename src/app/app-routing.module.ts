import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// *Implement Lazy Loading.
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "about",
    loadChildren: () =>
      import("./pages/about/about.module").then((m) => m.AboutModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "portfolio",
    loadChildren: () =>
      import("./pages/products/products.module").then((m) => m.ProductsModule),
  },
  {
    path: "enquire",
    loadChildren: () =>
      import("./pages/get-in-touch/get-in-touch.module").then(
        (m) => m.GetInTouchModule
      ),
  },
  // {
  //   path: "upload",
  //   loadChildren: () =>
  //     import("./pages/file-upload/file-upload.module").then(
  //       (m) => m.FileUploadModule
  //     ),
  // },
  {
    path: "gallery",
    loadChildren: () =>
      import("./pages/gallery/gallery.module").then((m) => m.GalleryModule),
  },
  // {
  //   path: "upload",
  //   loadChildren: () =>
  //     import("./pages/file-upload/file-upload.module").then(
  //       (m) => m.FileUploadModule
  //     ),
  // },
  {
    path: "BlogDetail",
    loadChildren: () =>
      import("./pages/blog-detail/blog-detail.module").then(
        (m) => m.BlogDetailModule
      ),
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
