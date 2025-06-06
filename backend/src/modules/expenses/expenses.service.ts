/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';

// mock data
const initialExpenses: Expense[] = [
  {
    id: 1,
    description: 'Monthly Subscription',
    amount: 15.0,
    date: '2025-06-05',
  },
  { id: 2, description: 'Coffee with team', amount: 22.5, date: '2025-06-04' },
  { id: 3, description: 'New Keyboard', amount: 125.0, date: '2025-06-03' },
  { id: 4, description: 'Lunch', amount: 18.75, date: '2025-06-03' },
  { id: 5, description: 'Cloud Server Bill', amount: 55.2, date: '2025-06-01' },
];

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [...initialExpenses];

  // TODO: Implement actual logic
  create(createExpenseDto: CreateExpenseDto): null {
    return null;
  }

  findAll(): Expense[] {
    return this.expenses;
  }

  remove(id: number): { message: string } {
    const initialLength = this.expenses.length;
    this.expenses = this.expenses.filter((expense) => expense.id !== id);

    if (this.expenses.length === initialLength) {
      throw new NotFoundException(`Expense with ID #${id} not found.`);
    }

    return { message: `Successfully removed expense #${id}` };
  }
}
