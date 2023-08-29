import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    // this._route.params.subscribe((params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
    // now we use resolver
    this._route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }
  onEdit() {
    this._router.navigate(['/servers', this.server.id, 'edit'], {
      relativeTo: this._route,
      queryParamsHandling: 'preserve',
    });
  }
}
