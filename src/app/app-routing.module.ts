import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { paymentSuccessGuard } from "./Guards/payment-success.guard";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { adminGuard } from "./Guards/admin.guard";
import { articleResolver } from "./resolvers/article.resolver";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "blog",
    loadChildren: () =>
      import("./pages/blog/blog.module").then((m) => m.BlogModule),
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
        (m) => m.GetInTouchModule,
      ),
  },
  {
    path: "gallery",
    loadChildren: () =>
      import("./pages/gallery/gallery.module").then((m) => m.GalleryModule),
  },
  {
    path: "BlogDetail",
    loadChildren: () =>
      import("./pages/blog-detail/blog-detail.module").then(
        (m) => m.BlogDetailModule,
      ),
  },
  { path: "download",  loadComponent: () =>
      import("./Components/pricing-card/pricing-card.component").then(
        (m) => m.PricingCardComponent,
      ),
    },
  {
    path: "payment-success",
    loadComponent: () =>
      import("./Components/payment-success/payment-success.component").then(
        (m) => m.PaymentSuccessComponent,
      ),
    canActivate: [paymentSuccessGuard],
  },
  {
    path: "payment-cancel",
    loadComponent: () =>
      import("./Components/payment-cancel/payment-cancel.component").then(
        (m) => m.PaymentCancelComponent,
      ),
  },
  {
    path: "admin/login",
    loadComponent: () =>
      import("./pages/admin-dashboard/admin-login/admin-login.component").then(
        (m) => m.AdminLoginComponent
      ),
  },
  {
    path: "admin",
    canActivate: [adminGuard],
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/admin-dashboard/admin-dashboard.component").then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: "new",
        loadComponent: () =>
          import("./pages/admin-dashboard/editor/editor.component").then(
            (m) => m.EditorComponent
          ),
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/admin-dashboard/editor/editor.component").then(
            (m) => m.EditorComponent
          ),
        resolve: { article: articleResolver },
      }
    ]
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
