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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  name: any;
  catergory_id: any;
  quantity: any;
  unit_price: any;
  promotion_price: any;
  image: any;
  description: any;
  //detail: any;
  status: any;
  message: any;
  products: any;
  product: any;
  catergory: any;
  iD_product: any;
  submitted: any = false;
  p: number = 1;
  term:any;

  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  totalRecords: any;
  config: any;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;







  ngOnInit(): void {

  this.formData = this.fb.group({
  name: ['', Validators.required],
  catergory_id:  [''],
  quantity:  [''],
  unit_price:  [''],
  promotion_price: [''],
  image: [''],
  description:  [''],
  //detail: [''],
  status:  [''],
  iD_product: ['']
    });


    Observable.combineLatest(
      this._api.get('api/item/get-all'),

    ).takeUntil(this.unsubcribe).subscribe(
      res=> {
        this.products = res[0];
        console.log(this.products);
      setTimeout(() => {
      //   this.loadScripts();
      });
      }, err => { })
      Observable.combineLatest(this._api.get('api/itemgroup/get-menu')).takeUntil(this.unsubcribe)
      .subscribe(res => {
        this.catergory = res[0];

    }, err => {})
  }
  

  getProduct(id: any) {
    Observable.combineLatest(
      this._api.get('api/item/get-by-id/'+id)
    ).takeUntil(this.unsubcribe).subscribe(
      res => {
        this.product = res;
        console.log(this.product)
      }
    )
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/item/delete/' + id)
    ).takeUntil(this.unsubcribe).subscribe(
      res => {
                this.products = this.products.filter(val => val.iD_product !== id);               
        } 
      )
       alert('Xóa thành công!');
       location.reload();
  }



  update(id: any) {


    Observable.combineLatest(
    this._api.get('api/item/get-by-id/'+id)
    
  ).subscribe(
    res => {
      this.product = res[0];
      console.log(this.product);
      console.log(id);
      this.catergory_id = this.product.catergory_id;
      setTimeout(() => {
        this.formData.controls['iD_product'].setValue(this.product.iD_product);
        this.formData.controls['name'].setValue(this.product.name);
        this.formData.controls['quantity'].setValue(this.product.quantity);
        this.formData.controls['unit_price'].setValue(this.product.unit_price);
        this.formData.controls['promotion_price'].setValue(this.product.promotion_price);
        this.formData.controls['description'].setValue(this.product.description);
        this.formData.controls['catergory_id'].setValue(this.product.catergory_id);
        this.formData.controls['status'].setValue(this.product.status);
        $(".modal-title").html("Sửa sản phẩm");
        $('#formModal').modal('toggle');
      //  this.formData.reset();


      });

    }
  )
}


  //Show modal
  create() {
    this.formData.reset();
    $(".modal-title").html("Thêm sản phẩm");
    $('#formModal').modal('toggle');
    }


    onSubmitCreate(value: any) {
      this.submitted = true;
  
            if (value.iD_product == null) {
              this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
                let data_image = data == '' ? null : data;
                console.log(value);
                this._api.post('api/item/create-item', {
                  name: value.name,
                  image: data_image,
                  catergory_id: value.catergory_id,
                  quantity: +value.quantity,
                  unit_price: +value.unit_price,
                  promotion_price: +value.promotion_price,
                  description: value.description,
                  status: +value.status,
                }).takeUntil(this.unsubcribe).subscribe((res) => {
                  this.message = res;
                  this.products.unshift(this.message);
                  $("#formModal").modal('hide');
                });
               
              });
            } else {
              console.log(value);
              this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
                let data_image = data == '' ? null : data;
                this._api.post('api/item/update-item/' + value.iD_product, {
                  name: value.name,
                  catergory_id: value.catergory_id,
                  quantity: +value.quantity,
                  unit_price: +value.unit_price,
                  promotion_price: +value.promotion_price,
                  image: data_image,
                  description: value.description,
                  status: +value.status,
                }).takeUntil(this.unsubcribe).subscribe((res) => {
                  // this.message = res;
                  //    this.products[this.findIndexById(this.message.iD_product)] = this.message;
                  //  location.reload();
                  $("#formModal").modal('hide');
                });
               // location.reload();
              });
            }
    }
  
    search() {
      this.page = 1;
      this.pageSize = 5;
      this._api.post('api/product/search', { page: this.page, pageSize: this.pageSize, category_id: this.formsearch.get('category_id') })
        .takeUntil(this.unsubcribe).subscribe(
          res => {
            this.products = res.data;
            this.totalRecords = res.totalRecords;
            this.pageSize = res.pageSize;
          }
        );
    }
    findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].product_id == id) {
              index = i;
              break;
          }
      }

      return index;
  }

  }



