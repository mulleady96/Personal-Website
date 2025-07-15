import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaymentCancelComponent } from "./Components/payment-cancel/payment-cancel.component";
import { PaymentSuccessComponent } from "./Components/payment-success/payment-success.component";
import { PricingCardComponent } from "./Components/pricing-card/pricing-card.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

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
  { path: "download", component: PricingCardComponent },
  { path: "payment-success", component: PaymentSuccessComponent },
  { path: "payment-cancel", component: PaymentCancelComponent },
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
