import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DonorsTableComponent } from './donors-table/donors-table.component';


@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot([
      { path: 'home', component: DonorsTableComponent },

    ]),

  ]
})
export class AppRoutingModule { }
