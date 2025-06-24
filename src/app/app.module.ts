import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { GiftsComponent } from './gifts/gifts.component';
import { DonationsComponent } from './donations/donations.component';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { DonorDaialogComponent } from './donor-daialog/donor-daialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import { DesktopComponent } from './desktop/desktop.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { DonorManamgementGuard } from './donor-manamgement.guard';
import { FilterDataComponent } from './filter-data/filter-data.component';
import { SegmentationsComponent } from './segmentations/segmentations.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DonorsTableComponent } from './donors-table/donors-table.component';
import { FiltersComponent } from './segmentations/filters/filters.component';
//import { DonorsTableComponent } from './donors-table/donors-table.component';
import { MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CountDonation, DateFormatPipe } from './pipes';
import { GiftDialogComponent } from './gift-dialog/gift-dialog.component';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { environment } from 'src/environment/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddItemToComboDataComponent } from './add-item-to-combo-data/add-item-to-combo-data.component'; // Import MatSnackBarModule




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DonorsTableComponent,
    GiftsComponent,
    DonationsComponent,
    CreateDonationComponent,
    DonorDaialogComponent,
    DesktopComponent,
    LoginComponent,
    FilterDataComponent,
    SegmentationsComponent,
    FiltersComponent,
    DateFormatPipe,
    CountDonation,
    GiftDialogComponent,
    AddItemToComboDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'desktop', canActivate: [DonorManamgementGuard], component: DesktopComponent },
      { path: 'dialog', canActivate: [DonorManamgementGuard], component: DonorDaialogComponent },
      { path: 'createDonation',canActivate: [DonorManamgementGuard], component: CreateDonationComponent },
      { path: 'login',component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: LoginComponent },
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [

      {
        provide: HTTP_INTERCEPTORS,
        useClass: BaseUrlInterceptor,
        multi: true
      },
      {
        provide: "BASE_API_URL", useValue: environment.baseUrl
      }


  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
