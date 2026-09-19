import { Injectable } from '@nestjs/common';

export class MailService {
  send() {
    console.info('Send Email');
  }
}

export const mailService = new MailService();
