import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


import { ActivatedRoute } from '@angular/router';
@
  Component({
    selector: 'list',
    templateUrl: './list.html'
  })
export class ListComponent implements OnInit {
  itemData: any;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.itemData = JSON.parse(params['data']);
        console.log('Received data:', this.itemData);
      }
    });
  }

}
