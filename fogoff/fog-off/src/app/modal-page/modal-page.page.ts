import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  
  newAva: string = "1";
  constructor(private nav:NavController, private modalCtrl:ModalController) { }

  ngOnInit() {
    
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.newAva = idAttr.nodeValue;
    console.log("Character select ID " + this.newAva)

    this.dismissAvaModal();
  }

  dismissAvaModal() {
    this.modalCtrl.dismiss(this.newAva);
  }

  backClick() {
    this.modalCtrl.dismiss(null);
  }

}
