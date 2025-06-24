import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DonorsManegementService } from '../donors-manegement.service';

@Component({
  selector: 'app-add-item-to-combo-data',
  templateUrl: './add-item-to-combo-data.component.html',
  styleUrls: ['./add-item-to-combo-data.component.css']
})
export class AddItemToComboDataComponent {
  @Output() saveAddGift = new EventEmitter<string>();
  @Input() giftOrCity: string = '';
  name: string = ""
  constructor(private _service: DonorsManegementService) { }
  save() {
    debugger
    if (this.giftOrCity = "gift")
      this._service.addGiftNames(this.name).subscribe(x => {
        if (x)
          this.saveAddGift.emit(this.name)
      })
    else
      this._service.addCity(this.name).subscribe(x => {
        if (x)
          this.saveAddGift.emit(this.name)
      })
  }
}
