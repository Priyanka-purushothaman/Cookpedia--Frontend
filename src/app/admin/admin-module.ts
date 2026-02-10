import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';
import { AdminUserlist } from './admin-userlist/admin-userlist';
import { AdminDownloadlist } from './admin-downloadlist/admin-downloadlist';
import { AdminFeedbacklist } from './admin-feedbacklist/admin-feedbacklist';
import { AdminManageRecipe } from './admin-manage-recipe/admin-manage-recipe';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { HighchartsChartComponent } from 'highcharts-angular';
import { SearchPipe } from '../pipes/search-pipe';


@NgModule({
  declarations: [
    AdminDashboard,
    AdminRecipelist,
    AdminUserlist,
    AdminDownloadlist,
    AdminFeedbacklist,
    AdminManageRecipe,
    AdminSidebar
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
   MatButtonModule,
   MatDatepickerModule,
   MatCardModule,
   HighchartsChartComponent
   
  ],
  providers:[
    provideNativeDateAdapter()
  
  ]
})
export class AdminModule { }
