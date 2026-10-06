import { Routes } from "@angular/router";
import { paymentSuccessGuard } from "./Guards/payment-success.guard";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { adminGuard } from "./Guards/admin.guard";
import { articleResolver } from "./resolvers/article.resolver";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "home",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "blog",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/blog/blog.component").then((m) => m.BlogComponent),
      },
      {
        path: ":id",
        loadComponent: () =>
          import("./pages/blog/blog.component").then((m) => m.BlogComponent),
        resolve: { article: articleResolver },
      },
    ],
  },
  {
    path: "portfolio",
    loadComponent: () =>
      import("./pages/products/products.component").then((m) => m.ProductsComponent),
  },
  {
    path: "enquire",
    loadComponent: () =>
      import("./pages/get-in-touch/get-in-touch.component").then(
        (m) => m.GetInTouchComponent,
      ),
  },
  {
    path: "gallery",
    loadComponent: () =>
      import("./pages/gallery/gallery.component").then((m) => m.GalleryComponent),
  },
  {
    path: "download",
    loadComponent: () =>
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
    path: "AR-corner",
    loadComponent: () =>
      import("./Components/camera-kit/camera-kit.component").then(
        (m) => m.CameraKitComponent,
      ),
  },
  {
    path: "admin/login",
    loadComponent: () =>
      import("./pages/admin-dashboard/admin-login/admin-login.component").then(
        (m) => m.AdminLoginComponent,
      ),
  },
  {
    path: "privacy-policy",
    loadComponent: () =>
      import("./pages/privacy-policy/privacy-policy.component").then(
        (m) => m.PrivacyPolicyComponent,
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
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: "new",
        loadComponent: () =>
          import("./pages/admin-dashboard/editor/editor.component").then(
            (m) => m.EditorComponent,
          ),
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/admin-dashboard/editor/editor.component").then(
            (m) => m.EditorComponent,
          ),
        resolve: { article: articleResolver },
      },
    ],
  },
  { path: "**", component: PageNotFoundComponent },
];
