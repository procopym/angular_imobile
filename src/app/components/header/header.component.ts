import {Component, OnInit} from '@angular/core';
import {RxPubSub} from 'rx-pubsub';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showSubmenu: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  hideSubmenu():void{
    this.showSubmenu = false;
  }

  showRequestModal(): void {
    RxPubSub.publish('showRequestsModal', true);
    this.hideSubmenu();
  }
}
