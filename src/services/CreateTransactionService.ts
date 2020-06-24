import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    // TODO
    let createdTransaction;

    const createTransaction = () => {
      return this.transactionsRepository.create({
        title,
        type,
        value,
      });
    };

    switch (type) {
      case 'income':
        createdTransaction = createTransaction();
        break;
      case 'outcome':
        const { total } = this.transactionsRepository.getBalance();
        if (total < value) throw Error('Insufficient funds');
        createdTransaction = createTransaction();
        break;
      default:
        throw Error('Type is invalid');
    }

    return createdTransaction;
  }
}

export default CreateTransactionService;
