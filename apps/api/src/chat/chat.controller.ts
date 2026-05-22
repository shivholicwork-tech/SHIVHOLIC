import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a message to AI chat' })
  async sendMessage(@Body() dto: SendMessageDto, @CurrentUser() user: JwtPayload) {
    return this.chatService.sendMessage(dto, user.sub);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'List user conversations' })
  async getConversations(@CurrentUser() user: JwtPayload) {
    return this.chatService.getConversations(user.sub);
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get a specific conversation' })
  async getConversation(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.chatService.getConversation(id, user.sub);
  }
}
