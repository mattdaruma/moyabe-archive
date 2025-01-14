import { BotManagerService } from './bot-manager.service';

import { AppComponent } from './app.component';
import { UploadSourceComponent } from './upload-source/upload-source.component';
import { TrainDataComponent } from './train-data/train-data.component';
import { PredictComponent } from './predict/predict.component';
import { ConfigureBotComponent } from './configure-bot/configure-bot.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    AppComponent,
    ConfigureBotComponent,
    UploadSourceComponent,
    TrainDataComponent,
    PredictComponent,
    ConfigureBotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxCsvParserModule
  ],
  providers: [BotManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
