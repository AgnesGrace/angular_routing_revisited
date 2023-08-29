import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;

  constructor(
    private serversService: ServersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    console.log(this._route.snapshot.queryParams);
    console.log(this._route.snapshot.fragment);
    this._route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }
  canDeactivate(): boolean {
    if (!this.allowEdit) return true;
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changeSaved
    ) {
      return confirm('Are you sure you want to discard the changes?');
    } else {
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changeSaved = true;
    this._router.navigate(['../'], { relativeTo: this._route });
  }
}
