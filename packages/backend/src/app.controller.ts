import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Welcome')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Welcome to Persmon EMS API' })
  getHello(): { message: string } {
    return { message: 'Welcome to Persmon EMS API' };
  }
}