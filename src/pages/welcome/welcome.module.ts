import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from "./WelcomePage";

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {}
