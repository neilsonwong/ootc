import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
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
