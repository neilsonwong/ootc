import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emoji-text',
  templateUrl: './emoji-text.component.html',
  styleUrls: ['./emoji-text.component.scss']
})
export class EmojiTextComponent implements OnInit {
  @Input() thin?: boolean;
  @Input() faceFirst?: boolean;
  @Input() emoji?: string;

  constructor() { }

  ngOnInit() {
  }
}
