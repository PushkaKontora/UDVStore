import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {IProduct} from "../../../../interfaces/products";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {parseJson} from "@angular/cli/utilities/json-file";

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

    public productGroup = new FormGroup({
        name: new FormControl(null),
        coins: new FormControl(null, [Validators.min(0)]),
    });

    constructor(private _requestService: RequestService) {
    }

    ngOnInit(): void {
        this.getStorageElements();
    }

    //
    // public checkTypeNumber(number: number): boolean{
    //     return Number.isInteger(number);
    // }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }

    public openModel(nameModel: string, product: IProduct) {
        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
        this.elementForInteraction = product;
        this.fillInControls(product);
        console.log(product)
    }

    public closeModel(nameModel: string) {
        document.getElementById(nameModel)!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public deleteProduct(nameModal: string) {
        this._requestService.deleteProduct(this.elementForInteraction.id)
            .subscribe();
        this.closeModel(nameModal);
        this.getStorageElements();
    }

    public onChangeAmountSizeStorage(event: any, elementId: number) {
        let newValue = event.target.value;
        for (let i = 0; i < this.elementForInteraction.cells.length; i++) {
            const enumerableElement = this.elementForInteraction.cells[i];
            if (elementId === enumerableElement.id) {
                this.elementForInteraction.cells[i].amount = Number(newValue)
            }
        }
        console.log(newValue, elementId, this.elementForInteraction.cells)
    }

    public onSubmitChanges(): void {
        this.closeModel('editProduct');
        let newValue =this.createFormData();
        this._requestService.changeProduct(this.elementForInteraction.id, newValue)
            .subscribe();
        this.getStorageElements();
    }


    public onChangePhoto(event: any): void{

        console.log(event)
    }

    private createFormData(): any {
        let newValue = new FormData();
        newValue.append('name', this.elementForInteraction.name);
        newValue.append('description', this.elementForInteraction.description);
        newValue.append('price', JSON.stringify(this.elementForInteraction.price));
        newValue.append('photo', this.elementForInteraction.photo);
        newValue.append('cells', JSON.stringify(this.elementForInteraction.cells));


        console.log(newValue.get('name'), newValue.get('price'), newValue.get('photo'))
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
        this.productGroup.value.name = product.name;
        this.productGroup.value.coins = product.price;
        //this.productGroup.value.name = products.name;
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


/*
   попапы изменения отличаются наличием dimensionLine
 */
