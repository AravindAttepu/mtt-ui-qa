import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gate-coaching-home',
  templateUrl: './gate-coaching-home.component.html',
  styleUrls: ['./gate-coaching-home.component.scss']
})
export class GateCoachingHomeComponent implements OnInit {

  isModalOpen = false; // state to track modal

  constructor() { }

  ngOnInit(): void {}

  openModal(event: Event): void {
    event.preventDefault();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
