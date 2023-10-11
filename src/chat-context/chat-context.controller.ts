import { Controller, Get, Param } from '@nestjs/common';
import { ChatContextService } from './chat-context.service';

@Controller('test')
export class ChatContextController {
  constructor(private readonly chatContextService: ChatContextService) {}

  @Get('get-pdfs/list')
  getPdfsList() {
    return this.chatContextService.getPdfsList();
  }

  @Get('create-chain/file:name')
  usePdfDoc(@Param('name') name: string) {
    return this.chatContextService.usePdfDoc(name);
  }

  @Get('ask:prompt')
  askAssistant(@Param('prompt') prompt: string) {
    return this.chatContextService.askAssistant(prompt);
  }
}
