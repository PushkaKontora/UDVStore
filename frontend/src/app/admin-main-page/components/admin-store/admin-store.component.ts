import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {IProduct} from "../../../../interfaces/products";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {cell} from "../../../../interfaces/interfaces";
import {TUI_DEFAULT_MATCHER, tuiPure} from "@taiga-ui/cdk";
import {ISize} from "../../../../interfaces/size";
import * as $ from "jquery";

const ITEMS: readonly string[] = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL',
];

const sizeDictionary = {
    'XXS': 8,
    'XS': 1,
    'S': 2,
    'M': 3,
    'L': 4,
    'XL': 5,
    'XXL': 6,
    'XXXL': 7,
}

@Component({
    selector: 'personal-orders',
    templateUrl: './admin-store.component.html',
    styleUrls: [
        './styles/admin-store.component.scss',
        './styles/admin-store-popup.component.scss'
    ]
})
export class AdminStoreComponent implements OnInit {
    public storageElements?: IProduct[];
    public elementForInteraction: IProduct;
    public sizeInteraction: ISize[];
    public productWithDimensionalGrid: boolean = false;
    public itemsNewCells: readonly cell[];
    public search: string | null = '';
    public arraySize: string[] = []
    public productGroup = new FormGroup({
        name: new FormControl(null),
        coins: new FormControl(null, [Validators.min(0)]),
        selectionSize: new FormControl(this.arraySize),
    });

    @tuiPure
    filter(search: string | null): readonly string[] {
        return ITEMS.filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
    }

    private _newPhotoFile: File;
    private _withoutDimensionalGridAmount: number = 0;

    constructor(private _requestService: RequestService) {
    }

    ngOnInit(): void {
        this.getStorageElements();
    }

    public onProductWithDimensionalGrid(value: boolean): void {
        this.productWithDimensionalGrid = value;
    }

    public onChangeVisibility(product: IProduct) {
        let productVisibility = product.is_visible;
        this._requestService.changeProductVisibility(product.id, {'is_visible': !productVisibility})
            .subscribe({
                complete: () => this.getStorageElements()
            })
    }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }

    public openModel(nameModel: string, product: IProduct) {
        this.elementForInteraction = product;
        this.sizeInteraction = product.cells
        this.fillInControls(product);

        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public openModelForAddItem(nameModel: string): void {
        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel(nameModel: string) {
        document.getElementById(nameModel)!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
        this.sizeInteraction = [];
        this.productGroup.reset()
    }

    public deleteProduct(nameModal: string) {
        this._requestService.deleteProduct(this.elementForInteraction.id)
            .subscribe({
                complete: () => {
                    this.closeModel(nameModal);
                    this.getStorageElements();
                }
            });
    }

    public onChangeAmountSizeStorage(event: any, productSize: number) {
        let newValue = event.target.value;
        for (let i = 0; i < this.sizeInteraction.length; i++) {
            const enumerableElement = this.sizeInteraction[i];
            if (productSize === enumerableElement.size) {
                this.sizeInteraction[i].amount = Number(newValue)
            }
        }
    }

    public onChangeAmountSizeStorageAdd(event: any) {
        let newValue = Number(event.target.value);
        this._withoutDimensionalGridAmount = newValue
    }

    public onChangePhoto(event: any, elementChange: string): void {
        this._newPhotoFile = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    $(`#${elementChange}`).attr('src', e.target.result.toString());
                }
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    public onChangeSizeLine() {
        let arraySize: any[] = [];
        const lineSize = this.productGroup.value.selectionSize;
        for (let i = 0; i < lineSize.length; i++) {
            const enumerableElement = lineSize[i];
            let newElement = this.getValueByKey(sizeDictionary, enumerableElement)
            if (newElement != undefined) {
                arraySize.push(newElement);
            }
        }

        this.sizeInteraction = this.createNewSizeArrayForIterations(arraySize);
    }

    public onSubmitChanges(): void {
        let newValue = this.createFormData();
        this._requestService.changeProduct(this.elementForInteraction.id, newValue)
            .subscribe({
                complete: () => {
                    this.getStorageElements();
                    this.closeModel('editProduct');
                }
            });
    }

    public onAddNewProduct() {
        let newValue = this.createFormDataNewProduct();
        this._requestService.addProduct(newValue)
            .subscribe({
                complete: () => {
                    this.getStorageElements();
                    this.closeModel('additNewProduct');
                }
            });
    }

    private createNewSizeArrayForIterations(arraySize: any[]): ISize[] {
        let newSizeArrayForIterations: any[] = [];
        for (let j = 0; j < arraySize.length; j++) {
            let booleanCheck: boolean = false;
            let elementSizeInteraction: any;
            for (let i = 0; i < this.sizeInteraction.length; i++) {
                const enumerableElement = this.sizeInteraction[i];
                if (enumerableElement.size === arraySize[j]) {
                    booleanCheck = true;
                    elementSizeInteraction = enumerableElement;
                }
            }

            if (!booleanCheck) {
                newSizeArrayForIterations.push({
                    size: arraySize[j],
                    amount: 0
                })
            } else {
                if (elementSizeInteraction) {
                    newSizeArrayForIterations.push(elementSizeInteraction)
                }
            }
        }

        return newSizeArrayForIterations
    }


    private createFormData(): any {
        let newValue = new FormData();
        if (this.productGroup.value.name !== null) {
            newValue.append('name', this.productGroup.value.name);
        } else {
            newValue.append('name', this.elementForInteraction.name);
        }
        newValue.append('description', this.elementForInteraction.description);
        if (this.productGroup.value.coins !== null) {
            newValue.append('price', this.productGroup.value.coins.toString());
        } else {
            newValue.append('price', this.elementForInteraction.price.toString());
        }
        if (this._newPhotoFile !== undefined) {
            newValue.append('photo', this._newPhotoFile);
        }
        newValue.append('cells', JSON.stringify(this.sizeInteraction));

        return newValue
    }

    private createFormDataNewProduct(): any {
        let newValue = new FormData();
        newValue.append('name', this.productGroup.value.name);
        newValue.append('description', 'oops? later?');
        newValue.append('price', this.productGroup.value.coins.toString());
        if (this._newPhotoFile !== undefined) {
            newValue.append('photo', this._newPhotoFile);
        }
        if (this.sizeInteraction === undefined) {
            const cell = [{
                size: 0,
                amount: this._withoutDimensionalGridAmount
            }]
            newValue.append('cells', JSON.stringify(cell));
        } else {
            newValue.append('cells', JSON.stringify(this.sizeInteraction));
        }

        return newValue
    }

    private getStorageElements(): void {
        let products: IProduct[];
        this._requestService.getStorageElements()
            .subscribe({
                next: (elements: IProduct[]) => {
                    products = elements;
                },
                complete: () => {
                    products!.map((element: IProduct) => {
                        if (element.cells.length > 1) {
                            element['dimensionLine'] = this.getDimensionLineSize(element)[0];
                            element['dimensionArray'] = this.getDimensionLineSize(element)[1];
                        }

                        let counterAmount = 0;
                        for (let i of element.cells) {
                            counterAmount += i.amount;
                        }
                        element['generalAmount'] = counterAmount;
                    })
                    this.storageElements = products;
                },
                error: (error) => {
                    console.log(error)
                }
            });
    }

    private fillInControls(product: IProduct): void {
        for (let i = 0; i < product.cells.length; i++) {
            const enumerableElement = product.cells[i];
            let newElement = this.getKeyByValue(sizeDictionary, enumerableElement.size)
            if (newElement !== undefined) {
                this.arraySize.push(newElement);
            }
        }
        this.productGroup.value.name = product.name;
        this.productGroup.value.coins = product.price;
        this.productGroup.value.selectionSize = this.arraySize;
    }

    private getKeyByValue(object: any, value: number) {
        return Object.keys(object).find(key => object[key] === value);
    }

    private getValueByKey(object: any, key: number) {
        return Object.values(object).find(value => object[key] === value);
    }

    private getDimensionLineSize(element: IProduct): any[] {
        let lineSize: string[] = [];
        for (let i of element.cells) {
            switch (i.size) {
                case 1: {
                    lineSize.push('XS')
                    break;
                }
                case 2: {
                    lineSize.push('S')
                    break;
                }
                case 3: {
                    lineSize.push('M')
                    break;
                }
                case 4: {
                    lineSize.push('L')
                    break;
                }
                case 5: {
                    lineSize.push('XL')
                    break;
                }
                case 6: {
                    lineSize.push('XXL')
                    break;
                }
                case 7: {
                    lineSize.push('XXXL')
                    break;
                }

            }
        }

        return [lineSize.join(', '), lineSize];
    }
}

