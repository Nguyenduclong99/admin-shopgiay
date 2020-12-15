import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sanphamchay',
  templateUrl: './sanphamchay.component.html',
  styleUrls: ['./sanphamchay.component.css']
})
export class SanphamchayComponent extends BaseComponent implements OnInit {
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
