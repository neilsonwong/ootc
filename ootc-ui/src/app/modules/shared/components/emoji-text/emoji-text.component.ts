import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emoji-text',
  templateUrl: './emoji-text.component.html',
  styleUrls: ['./emoji-text.component.scss']
})
export class EmojiTextComponent implements OnInit {
  @Input() text: string;

  public face: string;
  private emojis = [
    `(* ^ ω ^)`, `(´ ∀ \` *)`, `(´｡•ω•｡\`)`, `(◕‿◕)`,
    `(ノ*°▽°*)`, `\(^Д^)/`, `(>_<)`, `(^-^*)`
  ];

  constructor() { }

  ngOnInit() {
    this.face = this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }
}
