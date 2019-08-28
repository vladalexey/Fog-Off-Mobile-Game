import { Component } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
// import { AlertPagePage } from '../alert-page/alert-page.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from '../auth/auth-response';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  username: string = "Player 1";
  distance: string = "0 km";
  level: number = 1;
  public character: string = "/assets/character1.gif";
  email: string;

  constructor(
    private modalCtr: ModalController, 
    private navCtr: NavController,
    private alert:AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ) {

      // Get data from previous view
      this.route.queryParams.subscribe(params => {

        if (this.router.getCurrentNavigation().extras.state) {
          this.data = this.router.getCurrentNavigation().extras.state.user_status;

          console.log("Tab1 Transfered Data " + this.data.user.username);
          
          // If not null, change username accordingly
          if (this.data.user.username) {
            this.email = this.data.user.email;
            this.username = this.data.user.username;
            this.level = this.data.user.level;
            this.distance = this.data.user.distance + " km";
            this.character = "/assets/character" + this.data.user.character + ".gif";
          }
        }
      });
    }

  async openAvaModal() {
    const avaModal = await this.modalCtr.create({
      component: ModalPagePage,
      cssClass: "customcss"
    });

      avaModal.onDidDismiss().then((data) => {
        // Get new characters
        
        if (data['data'] != null) {
          this.character = "/assets/character" + data['data'] + ".gif";

          let update_user: User = {
            character: data['data'], 
            email: this.email,
            id: null,
            username: null,
            password: null,
            distance: null,
            level: null
          }
          this.authService.updateUserAva(update_user).subscribe((res) => {
            console.log("AvaModal change Ava " + update_user);
          }), (err) => {
            console.log("Error in update Auth Service Update Ava" + err);
          }
        }

      }).catch((err) => {
        console.log("Dismiss AvaModal error " + err); 

    }).catch((err) => {
      console.log("Open AvaModal error " + err);
    });

    return await avaModal.present();
  }

  async openAlert() {
    const nameAlert = await this.alert.create({
      header: "Edit Name", 
      cssClass: "customcss",
      inputs: [
        {
          name: "new_username",
          type: "text",
          placeholder: "Type new username"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "customcss",
          handler: () => {
            console.log("Cancal ops");
          }
        }, {
          text: "OK",
          handler: (data) => {

            // TODO: Check new name legitimacy
            if (data.new_username == "") {
              console.log("Error: Empty name input")

            } else {

              console.log("New name")
              console.log(data.new_username)
              this.username = data.new_username;

              let update_user: User = {
                character: null, 
                email: this.email,
                id: null,
                username: this.username,
                password: null,
                distance: null,
                level: null
              }
              this.authService.updateUserUsername(update_user).subscribe((res) => {
                console.log("UsernameAlert change Username " + update_user);
              }), (err) => {
                console.log("Error in update Auth Service Update Username" + err);
              }


            }
          }
        }
      ]
    });
    await nameAlert.present();
  }

  clickLogout() {

    console.log("Tab1 Logout");
    this.authService.logout();

    this.authService.authSubject.subscribe((res) => {

      console.log("Tab1 after Logout " + res);
      if (res == false) {
        this.navCtr.navigateRoot("login")
      }
    })
  }
}
