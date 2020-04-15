import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulador, transaction) => {
      if (transaction.type === 'income') {
        return acumulador + transaction.value;
      }
      return acumulador;
    }, 0);

    const outcome = this.transactions.reduce((acumulador, transaction) => {
      if (transaction.type === 'outcome') {
        return acumulador + transaction.value;
      }
      return acumulador;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
