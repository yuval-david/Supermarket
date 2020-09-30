import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dialog-admin',
  templateUrl: './dialog-admin.component.html',
  styleUrls: ['./dialog-admin.component.css']
})
export class DialogAdminComponent implements OnInit {

  constructor(public _adminService: AdminService) { }

  ngOnInit() {
  }

  public refreshProducts() {
    window.location.reload();
  }

}
