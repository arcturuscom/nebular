/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

/**
 * Chat message component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-message',
  template: `
    <div class="avatar" [style.background-image]="avatarStyle">
      <ng-container *ngIf="!avatarStyle">
        {{ getInitials() }}
      </ng-container>
    </div>
    <div class="message">
      <ng-container [ngSwitch]="type">
        <nb-chat-message-image *ngSwitchCase="'image'" 
                               [sender]="sender" [date]="date" [message]="message" [file]="file">
        </nb-chat-message-image>

        <nb-chat-message-text *ngSwitchDefault 
                              [sender]="sender" [date]="date" [message]="message">
        </nb-chat-message-text>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageComponent {

  @HostBinding('class.reply')
  replyValue: boolean = false;

  @HostBinding('class.not-reply')
  get notReply() {
    return !this.replyValue;
  }

  avatarStyle: SafeStyle;

  /**
   * Determines if a message is a reply
   */
  @Input()
  set reply(val: boolean) {
    this.replyValue = convertToBoolProperty(val);
  }

  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

  /**
   * Message file (image if type is `image` and file if type is `attachment`)
   * @type {string}
   */
  @Input() file: string;

  /**
   * Message send avatar
   * @type {string}
   */
  @Input()
  set avatar(value: string) {
    this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Message type, available options `text|image|attachment|map`
   * @type {string}
   */
  @Input() type: string;

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}