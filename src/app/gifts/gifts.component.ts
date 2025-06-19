import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DonorsManegementService } from '../donors-manegement.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Donation, Donor, Gift, GiftTable } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { GiftDialogComponent } from '../gift-dialog/gift-dialog.component';
import { KeyValue } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],
})
export class GiftsComponent {
  @Input() donorId!: number
  @Output() refreshData = new EventEmitter<string>();
  giftsNameList!: KeyValue<number, string>[];
  giftName!: KeyValue<number, string>;

  dataSource: Gift[] = [];

  constructor(private _service: DonorsManegementService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this._service.getGiftsById(this.donorId).subscribe(x => {
      this.dataSource = x
    })

    this._service.getGiftNames().subscribe(x => this.giftsNameList = x)
  }

  columnsToDisplay = ['receivedDate', 'giftName', 'edit', 'delete'];
  namesToDisplay = ['תאריך', 'שם'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Gift;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element?: Gift, edit?: boolean): void {

    const dialogRef = this.dialog.open(GiftDialogComponent, {
      width: '26%',
      height: '43%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: { edit: edit, element: element ? element : null, donorId: this.donorId }
    });

    dialogRef.afterClosed().subscribe(x => {
      this.refreshData.emit('refresh');
    });
  }

  deleted(giftId: number) {
    this._snackBar.open(`?האם אתה בטוח שברצונך למחוק את המתנה`, 'אישור', {
      duration: 5000,
    }).onAction().subscribe(() => {
      this._service.deleteGift(giftId).subscribe(x => {
        if (x) {
          this.refreshData.emit('refresh');
        }
      });
    })
  }
  getGifts(gift: number) {
    this.giftsNameList.map(y => {
      if (y.key == gift)
        this.giftName = y
    })
    return this.giftName ? this.giftName : null
  }
}
