import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RateResultComponent } from './rate-result/rate-result.component';
import { RateSectionComponent } from './rate-section/rate-section.component';

@NgModule({
  declarations: [AppComponent, RateResultComponent, RateSectionComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
