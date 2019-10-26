import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  public face: string;
  private emojis = [
    `(* ^ ω ^)`, `(´ ∀ \` *)`, `(´｡•ω•｡\`)`, `(◕‿◕)`,
    `(ノ*°▽°*)`, `\\(^Д^)/`, `ヽ(*・ω・)ﾉ`, `(^-^*)`,
    `\\(★ω★)/`, `ヽ(°〇°)ﾉ`, `(´• ω •\`)ﾉ`, `(つ✧ω✧)つ`
  ];

  constructor() { }

  ngOnInit() {
    this.face = this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }
}
