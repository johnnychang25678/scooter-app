import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// GET /scooter?name=xxx&brand=xxx&... -> response {id: xxx, name: xxx, brand: xxx}
// POST /scooter body: {"name": xxx, "brand": xxx, ...}
// PATCH /scooter/${scooter_id}
