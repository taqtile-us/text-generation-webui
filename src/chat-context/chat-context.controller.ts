import { Controller, Get, Param } from '@nestjs/common';
import { ChatContextService } from './chat-context.service';

@Controller('test')
export class ChatContextController {
  constructor(private readonly chatContextService: ChatContextService) {}

  @Get('init-config-file')
  initConfigFile() {
    return this.chatContextService.initConfigFile();
  }

  @Get('ask:prompt')
  askAssistant(@Param('prompt') prompt: string) {
    return this.chatContextService.askAssistant(prompt);
  }
}
