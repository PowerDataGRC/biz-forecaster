import { Controller, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: { name: string; subdomain: string; firebase_user_id: string }) {
    return this.tenantsService.create(createTenantDto);
  }
}
