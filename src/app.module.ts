import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatContextModule } from './chat-context/chat-context.module';

@Module({
  imports: [ChatContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
