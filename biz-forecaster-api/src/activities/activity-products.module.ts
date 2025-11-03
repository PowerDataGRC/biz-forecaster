import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityProduct } from './activity-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityProduct])],
})
export class ActivityProductsModule {}