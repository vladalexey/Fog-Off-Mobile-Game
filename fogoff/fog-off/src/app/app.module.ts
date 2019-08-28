import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalPagePageModule } from './modal-page/modal-page.module';
import { AlertPagePageModule } from './alert-page/alert-page.module';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation} from '@ionic-native/geolocation/ngx';

import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ModalPagePageModule, 
    AlertPagePageModule,
    AuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
