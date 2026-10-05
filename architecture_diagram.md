# GravitaWebTech Architecture

```mermaid
graph TD
    %% Styling
    classDef page fill:#2a9d8f,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef component fill:#e9c46a,stroke:#333,stroke-width:2px,color:#333,rx:5px,ry:5px;
    classDef service fill:#e76f51,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef backend fill:#264653,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;

    %% Main Application Routing
    App([Angular App Router]) --> Home[Home Page]
    App --> Blog[Blog Page]
    App --> Gallery[Gallery Page]
    App --> Contact[Get-In-Touch Page]
    App --> Portfolio[Portfolio Page]
    App --> AR[AR Corner Page]

    class Home,Blog,Gallery,Contact,Portfolio,AR page;

    %% Page Dependencies (Components)
    Home --> CardComp(Card Component)
    Home --> BubblesComp(Bubbles Component)

    Gallery --> MediaListComp(Media List Component)
    Portfolio --> ProductsComp(Products Component)

    class CardComp,BubblesComp,MediaListComp,ProductsComp component;

    %% Service Layer
    Blog -.->|Fetches articles| GService{Gravita Service}
    Contact -.->|Submits enquiry| GService
    MediaListComp -.->|Fetches images| GService

    class GService service;

    %% Backend Integration
    GService ===>|API Calls| Backend[(Firebase / Backend)]
    class Backend backend;
```

### Key Sections:

1. **Pages (Green):** The main routable views the user interacts with (Home, Blog, Gallery, Contact, AR).
2. **Components (Yellow):** Reusable UI pieces like the Card Carousel and Media Gallery.
3. **Services (Orange):** `GravitaService` acts as the data bridge between the UI and the backend.
4. **Backend (Dark Blue):** The external data source (e.g. Firebase) where blogs, gallery images, and contact form submissions are stored.
