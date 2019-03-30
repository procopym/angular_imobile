import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxPubSub} from 'rx-pubsub';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';

interface Response {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-requests-modal',
  templateUrl: './requests-modal.component.html',
  styleUrls: ['./requests-modal.component.css']
})
export class RequestsModalComponent implements OnInit, OnDestroy {
  show: boolean = false;
  subscriber: any;
  requestForm: FormGroup;
  response: Response;

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit() {
    this.initSubscriber();
    this.createForm();
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      RxPubSub.unsubscribe(this.subscriber);
    }
  }

  close(): void {
    this.show = false;
  }

  get user() {
    return this.requestForm.get('user');
  }

  get description() {
    return this.requestForm.get('description');
  }

  onSubmit() {
    if (this.requestForm.valid) {
      console.log('FORMS', this.requestForm.value);
      this.api.sendRequest({...this.requestForm.value}).subscribe((response: Response) => {
        console.log('Response', response);
        this.response = response;
      });
    }
  }

  private initSubscriber(): void {
    this.subscriber = RxPubSub.subscribe('showRequestsModal', (show: boolean) => {
      this.response = null;
      this.createForm();
      this.show = show;
    });
  }

  private createForm(): void {
    this.requestForm = this.fb.group({
      user: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }


}
