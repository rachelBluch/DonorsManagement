import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DonorsManegementService } from '../donors-manegement.service';

@Component({
  selector: 'app-add-item-to-combo-data',
  templateUrl: './add-item-to-combo-data.component.html',
  styleUrls: ['./add-item-to-combo-data.component.css']
})
export class AddItemToComboDataComponent {
  @Output() saveAddGift = new EventEmitter<string>();
  @Output() saveAddCity = new EventEmitter<string>();

  @Input() giftOrCity: string = '';
  giftOrCityHeb: string = ""
  name:string=""
  ngOnInit(){
       if (this.giftOrCity == "city")
      this.giftOrCityHeb = "עיר"
    else if (this.giftOrCity == "gift")
      this.giftOrCityHeb = "מתנה"
  }
  constructor(private _service: DonorsManegementService) {}
  save() {
    if (this.giftOrCity == "gift"){
      this._service.addGiftNames(this.name).subscribe(x => {
        if (x)
          this.saveAddGift.emit(this.name)
      })}
    else{
      this._service.addCity(this.name).subscribe(x => {
        if (x)
          this.saveAddCity.emit(this.name)
      })}
  }
  close(){
 if (this.giftOrCity == "gift"){
          this.saveAddGift.emit("close")
      }
    else{
          this.saveAddCity.emit("close")
      }
  }
}
