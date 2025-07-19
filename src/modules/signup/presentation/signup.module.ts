import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup.controller';

@Module({
  imports: [],
  controllers: [SignupController],
  providers: [],
})
export class SignupModule {}
