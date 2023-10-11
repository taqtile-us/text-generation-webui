import { Module } from '@nestjs/common';
import { ChatContextController } from './chat-context.controller';
import { ChatContextService } from './chat-context.service';

@Module({
  imports: [],
  controllers: [ChatContextController],
  providers: [ChatContextService],
})
export class ChatContextModule {}
