import { Component, Injector, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sanphamcham',
  templateUrl: './sanphamcham.component.html',
  styleUrls: ['./sanphamcham.component.css']
})
export class SanphamchamComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  slowproducts: any;
  term:any;
  p: number = 1;
  ngOnInit(): void {

    Observable.combineLatest(
      this._api.get('api/item/get-san-pham-ban-cham'),

    ).takeUntil(this.unsubcribe).subscribe(
      res=> {
        this.slowproducts = res[0];
        console.log("san pham lay duoc:", this.slowproducts);
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
        this.slowproducts = this.slowproducts.filter(val => val.iD_product !== id);               
        } 
      );
       alert('Xóa thành công!');
  }
}
