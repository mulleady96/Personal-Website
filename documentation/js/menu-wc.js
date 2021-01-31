'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">gravita-web-tech documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutModule-975289836ba2a2c00676af26b0e21ea8"' : 'data-target="#xs-components-links-module-AboutModule-975289836ba2a2c00676af26b0e21ea8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutModule-975289836ba2a2c00676af26b0e21ea8"' :
                                            'id="xs-components-links-module-AboutModule-975289836ba2a2c00676af26b0e21ea8"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppMaterialModule.html" data-type="entity-link">AppMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' : 'data-target="#xs-components-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' :
                                            'id="xs-components-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' : 'data-target="#xs-injectables-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' :
                                        'id="xs-injectables-links-module-AppModule-d77e777ae116dc1c3cede6eff3ff2b1a"' }>
                                        <li class="link">
                                            <a href="injectables/ThemeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ThemeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BlogDetailModule.html" data-type="entity-link">BlogDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlogDetailModule-a9a7ee1b2807e26bf380b60eeed64f59"' : 'data-target="#xs-components-links-module-BlogDetailModule-a9a7ee1b2807e26bf380b60eeed64f59"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlogDetailModule-a9a7ee1b2807e26bf380b60eeed64f59"' :
                                            'id="xs-components-links-module-BlogDetailModule-a9a7ee1b2807e26bf380b60eeed64f59"' }>
                                            <li class="link">
                                                <a href="components/BlogDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' : 'data-target="#xs-components-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' :
                                            'id="xs-components-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' }>
                                            <li class="link">
                                                <a href="components/FlashCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlashCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MediaListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MediaListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' : 'data-target="#xs-directives-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' :
                                        'id="xs-directives-links-module-ComponentsModule-cd00aafe9e91a6883ec9606f1bcc98a5"' }>
                                        <li class="link">
                                            <a href="directives/InvisibleDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvisibleDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/UnderlineHoverDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnderlineHoverDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileUploadModule.html" data-type="entity-link">FileUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' : 'data-target="#xs-components-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' :
                                            'id="xs-components-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                            <li class="link">
                                                <a href="components/FileUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileUploadComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' : 'data-target="#xs-directives-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' :
                                        'id="xs-directives-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                        <li class="link">
                                            <a href="directives/DropZoneDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropZoneDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' : 'data-target="#xs-pipes-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' :
                                            'id="xs-pipes-links-module-FileUploadModule-d7912cf226ff6c3ee9c5f40ba686a52f"' }>
                                            <li class="link">
                                                <a href="pipes/FileSizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileSizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryModule.html" data-type="entity-link">GalleryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GalleryModule-c2c41a5fc2c264dd4ffce3006aa66fcf"' : 'data-target="#xs-components-links-module-GalleryModule-c2c41a5fc2c264dd4ffce3006aa66fcf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GalleryModule-c2c41a5fc2c264dd4ffce3006aa66fcf"' :
                                            'id="xs-components-links-module-GalleryModule-c2c41a5fc2c264dd4ffce3006aa66fcf"' }>
                                            <li class="link">
                                                <a href="components/GalleryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GalleryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GetInTouchModule.html" data-type="entity-link">GetInTouchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GetInTouchModule-e59a370cc3e57d2266d60a51b3d98827"' : 'data-target="#xs-components-links-module-GetInTouchModule-e59a370cc3e57d2266d60a51b3d98827"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GetInTouchModule-e59a370cc3e57d2266d60a51b3d98827"' :
                                            'id="xs-components-links-module-GetInTouchModule-e59a370cc3e57d2266d60a51b3d98827"' }>
                                            <li class="link">
                                                <a href="components/GetInTouchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GetInTouchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-8cb3e9a710c67d0d6d8ce53e5d1a2810"' : 'data-target="#xs-components-links-module-HomeModule-8cb3e9a710c67d0d6d8ce53e5d1a2810"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-8cb3e9a710c67d0d6d8ce53e5d1a2810"' :
                                            'id="xs-components-links-module-HomeModule-8cb3e9a710c67d0d6d8ce53e5d1a2810"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link">ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductsModule-22d465f2219e2faa4a91928c41d2aa7d"' : 'data-target="#xs-components-links-module-ProductsModule-22d465f2219e2faa4a91928c41d2aa7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductsModule-22d465f2219e2faa4a91928c41d2aa7d"' :
                                            'id="xs-components-links-module-ProductsModule-22d465f2219e2faa4a91928c41d2aa7d"' }>
                                            <li class="link">
                                                <a href="components/ProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GravitaService.html" data-type="entity-link">GravitaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HammerConfig.html" data-type="entity-link">HammerConfig</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link">ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Image.html" data-type="entity-link">Image</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImagesJson.html" data-type="entity-link">ImagesJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement.html" data-type="entity-link">PeriodicElement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});