import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ChatContextService } from './chat-context.service';
import { link } from 'fs';

@Controller('test')
export class ChatContextController {
  constructor(private readonly chatContextService: ChatContextService) {}

  @Get('get-projects-tree')
  getPdfsList() {
    return this.chatContextService.getPdfsList();
  }

  @Get('create-chain/file:name')
  usePdfDoc(@Param('name') name: string) {
    return this.chatContextService.usePdfDoc();
  }

  @Get('ask:prompt')
  askAssistant(@Param('prompt') prompt: string) {
    return this.chatContextService.askAssistant(prompt);
  }

  @Get('crawl?')
  useHTMLPage(@Query() query: {link: string}) {
    return this.chatContextService.useHTMLPage(query.link);
  }
}
