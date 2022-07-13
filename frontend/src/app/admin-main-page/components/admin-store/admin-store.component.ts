import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {IProduct} from "../../../../interfaces/products";

@Component({
    selector: 'personal-orders',
    templateUrl: './admin-store.component.html',
    styleUrls: ['./admin-store.component.scss']
})
export class AdminStoreComponent implements OnInit {
    public storageElements?: IProduct[];

    constructor(private _requestService: RequestService) {
    }

    ngOnInit(): void {
        this.getStorageElements();
    }

    private getStorageElements(): void {
        let products: IProduct[];
        this._requestService.getStorageElements()
            .subscribe({
                next: (elements: IProduct[]) => {
                    products = elements;
                    console.log(products, 'storEl')
                },
                complete: () => {
                    products!.map((element: IProduct) => {
                        if (element.cells.length > 1) {
                            element['dimensionLine'] = this.getDimensionLineSize(element);
                        }

                        let counterAmount = 0;
                        for (let i of element.cells) {
                            counterAmount += i.amount;
                        }
                        element['generalAmount'] = counterAmount;
                    })
                    this.storageElements = products
                },
                error: (error) => {
                    console.log(error)
                }
            });
    }

    private getDimensionLineSize(element: IProduct): string {
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

        return lineSize.join(', ');
    }
}
