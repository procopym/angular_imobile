import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

interface Response {
  user: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: Response[];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getRequests().subscribe((response: { success: boolean; data: Response[] }) => {
      if (response.success) {
        this.requests = response.data;
      } else {
        this.requests = [];
      }
    });
  }

}
