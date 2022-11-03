import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-page.component.html',
  styleUrls: ['./local-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
