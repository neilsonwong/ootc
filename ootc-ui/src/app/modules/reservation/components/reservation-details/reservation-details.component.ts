import { Component, OnInit } from '@angular/core';
import { EventDetails } from 'src/app/helpers/event-details';
import { TranslationService } from 'src/app/services/translationService';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent extends EventDetails implements OnInit {
  constructor(protected translationService: TranslationService) {
    super(translationService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
