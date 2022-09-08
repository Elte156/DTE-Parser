import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { HeaderComponent } from './header/header.component';
import { RateResultComponent } from './rate-result/rate-result.component';
import { RateSectionComponent } from './rate-section/rate-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RateResultComponent,
    RateSectionComponent,
    CardInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
