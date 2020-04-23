import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: Transaction['title'];
  value: Transaction['value'];
  type: Transaction['type'];
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total < value)
        throw new Error('Outcome transaction without a valid balance');
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
