import {Component, OnInit, Renderer2} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {IUser} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../../../../interfaces/products";


@Component({
    selector: 'main-merch-store',
    templateUrl: './merch-store.component.html',
    styleUrls: ['./merch-store.component.scss']
})
export class MerchStoreComponent implements OnInit {
    public storeProducts!: IProduct[];
    public loaded: boolean = false;
    public amountMerch: number = 1;
    public priceMerchValue: number = 0;
    public user: IUser;
    public selectedProduct!: IProduct;

    private _cellsId: number = 1;


    constructor(
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _fb: FormBuilder,
        private _renderer: Renderer2,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this._peopleService.getProducts()
            .subscribe({
                next: (res: IProduct[]) => this.storeProducts = res,
                complete: () => {
                    this.loaded = true;
                    this._peopleService.findUser.subscribe((res) => {
                        this.user = res
                    });
                }
            });
    }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }

    public checkOrder() {
        this.closeModel('modal2');
        this._router.navigate(['main-page', 'personal-area', 'orders']);
    }


    public chooseProduct(product: IProduct, amountProduct: number) {
        this._storeService.postSelectedProduct(amountProduct, product.cells[this._cellsId - 1].id)
            .subscribe({
                next: () => {
                    this._storeService.postBuyProduct();
                },
                complete: () => this._peopleService.getUserProduct()
            });
        this._peopleService.getUserProduct();
        this._peopleService.findUser.subscribe((res) => {
            this.user = res
        });
    }

    public openModel(nameModel: string, itemMerch: IProduct) {
        this.selectedProduct = itemMerch;
        this.priceMerchValue = itemMerch.price;
        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel(nameModel: string) {
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
        this.chooseProduct(this.selectedProduct, this.amountMerch);
        this.closeModel('modal1');
        this.openModel('modal2', this.selectedProduct);
        this._cellsId = 1;
        this.amountMerch = 1;
        this.priceMerchValue = 0;
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
