import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  products: any;
  term:any;
  p: number = 1;
  ngOnInit(): void {

    Observable.combineLatest(
      this._api.get('api/item/get-san-pham-ban-chay'),

    ).takeUntil(this.unsubcribe).subscribe(
      res=> {
        this.products = res[0];
        console.log("san pham lay duoc:", this.products);
      setTimeout(() => {
      //   this.loadScripts();
      });
      }, err => { })
  }
  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/item/delete/' + id)
    ).takeUntil(this.unsubcribe).subscribe(
      res => {
        this.products = this.products.filter(val => val.iD_product !== id);               
        } 
      );
       alert('Xóa thành công!');
  }
}
