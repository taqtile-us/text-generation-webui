import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { ChatContextService } from './chat-context.service';

@Controller('test')
export class ChatContextController {
  constructor(private readonly chatContextService: ChatContextService) {}

  @Get('list-of-projects')
  getListOfProjects() {
    try {
      return this.chatContextService.getListOfProjects();
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Get('init-config-file:project')
  initConfigFile(@Param('project') project: string) {
    try {
      return this.chatContextService.initConfigFile(project);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Get('ask?')
  askAssistant(@Query() query: { projectName: string; prompt: string }) {
    try {
      return this.chatContextService.askAssistant(
        query.prompt,
        query.projectName,
      );
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }
}
