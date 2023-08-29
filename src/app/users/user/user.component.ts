import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  subscription: Subscription;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    // this.user = {
    //   id: this._route.snapshot.params['userId'],
    //   name: this._route.snapshot.params['name'],
    // };
    this.subscription = this._route.params.subscribe((params) => {
      this.user = {
        id: params['userId'],
        name: params['name'],
      };
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
