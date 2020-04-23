import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: Transaction['title'];
  value: Transaction['value'];
  type: Transaction['type'];
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
    return this.transactions.reduce<Balance>(
      (balance: Balance, transaction: Transaction) => {
        const { type, value } = transaction;
        return {
          income: balance.income + (type === 'income' ? value : 0),
          outcome: balance.outcome + (type === 'outcome' ? value : 0),
          total: balance.total + (type === 'income' ? value : -value),
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
