import { Module } from '@nestjs/common';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
