import { Global, Module } from '@nestjs/common';
import { OwnershipService } from './guards/ownership.guard';

@Global()
@Module({
  providers: [OwnershipService],
  exports: [OwnershipService],
})
export class CommonModule {}
