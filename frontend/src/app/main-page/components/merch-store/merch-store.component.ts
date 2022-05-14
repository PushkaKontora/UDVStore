import {Component, OnInit, Renderer2} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {IUser, products} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


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
    public user!: IUser;
    public selectedProduct!: products;

    private _cellsId: number = 0;


    constructor(
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _fb: FormBuilder,
        private _renderer: Renderer2,
    ) {
        this.storeProducts = _peopleService.storeProducts;
        this.loaded = _peopleService.isLoaded;
        if (_peopleService.findUser) {
            this.user = _peopleService.findUser;
        }
    }

    ngOnInit(): void {
    }


    public chooseProduct(product: products) {
        this._storeService.postSelectedProduct(1, product.cells[this._cellsId].id)
            .subscribe(() => {
                this._storeService.postBuyProduct();
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
        this.amountMerch = 0;
        this._cellsId = 0;
        document.getElementById(nameModel)!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
        this._peopleService.getUser();
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
