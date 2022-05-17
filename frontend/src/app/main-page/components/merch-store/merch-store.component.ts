import {Component, OnInit, Renderer2} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {IUser, products} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";


@Component({
    selector: 'main-merch-store',
    templateUrl: './merch-store.component.html',
    styleUrls: ['./merch-store.component.scss']
})
export class MerchStoreComponent implements OnInit {
    public storeProducts!: products[];
    public loaded: boolean = false;
    public amountMerch: number = 1;
    public priceMerchValue: number = 0;
    public user: IUser;
    public selectedProduct!: products;

    private _cellsId: number = 0;


    constructor(
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _fb: FormBuilder,
        private _renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
        this._peopleService.getProducts()
            .subscribe({
                next: (res: products[]) => this.storeProducts = res,
                complete: () => {
                    this.loaded = true;
                    this._peopleService.findUser.subscribe((res) => {
                        this.user = res
                    });
                }
            });
    }


    public chooseProduct(product: products, amountProduct: number) {
        this._storeService.postSelectedProduct(amountProduct, product.cells[this._cellsId].id)
            .subscribe({
                next:() => {
                    this._storeService.postBuyProduct();
                },
                complete: () =>  this._peopleService.getUserProduct()
            });
        this._peopleService.getUserProduct();
        this._peopleService.findUser.subscribe((res) => {
            this.user = res
        });
    }

    public openModel(nameModel: string, itemMerch: products) {
        this.selectedProduct = itemMerch;
        this.priceMerchValue = itemMerch.price;
        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel(nameModel: string) {
        this.amountMerch = 1;
        this._cellsId = 0;
        document.getElementById(nameModel)!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public changeSize(node: any, sizeNumber: number) {
        this._cellsId = sizeNumber;
        let el = document.querySelectorAll('.selectedSize');
        el.forEach(function (i) {
            i.classList.remove('selectedSize');
        })
        if (node) {
            this._renderer.addClass(node.target, 'selectedSize');
        }
    }

    public onSubmit() {
        this.closeModel('modal1');
        this.openModel('modal2', this.selectedProduct);
        this.chooseProduct(this.selectedProduct, this.amountMerch);
    }

    public reduceAmount() {
        if (this.amountMerch !== 1) {
            this.amountMerch -= 1;
        }
    }

    public increaseAmount(): number {
        return this.amountMerch += 1;
    }
}
