import React, { useState, useEffect } from 'react';
import './Expensive.css';

interface Expensive {
  date: string;
  expenseId: number;
  category: string;
  amount: number;
}

const Expensive: React.FC = () => {
  const [expenses, setExpenses] = useState<Expensive[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expensive[]>([]);
  const [formExpense, setFormExpense] = useState<Expensive>({
    date: '',
    expenseId: 0,
    category: '',
    amount: 0,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialExpenses: Expensive[] = [
      { date: '2024-01-15', expenseId: 1, category: 'Office Supplies', amount: 150 },
      { date: '2024-02-15', expenseId: 2, category: 'Utilities', amount: 200 },
    ];
    setExpenses(initialExpenses);
    setFilteredExpenses(initialExpenses);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = expenses.filter(expense =>
      Object.values(expense).some(value =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredExpenses(filtered);
  };

  const handleAddExpense = () => {
    setIsFormVisible(true);
    setFormExpense({
      date: '',
      expenseId: Math.max(...expenses.map(e => e.expenseId), 0) + 1,
      category: '',
      amount: 0,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormExpense({ ...formExpense, [e.target.name]: e.target.value });
  };

  const handleSaveExpense = () => {
    const existingExpenseIndex = expenses.findIndex(expense => expense.expenseId === formExpense.expenseId);

    if (existingExpenseIndex !== -1) {
      const updatedExpenses = [...expenses];
      updatedExpenses[existingExpenseIndex] = formExpense;
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } else {
      const newExpenses = [...expenses, formExpense];
      setExpenses(newExpenses);
      setFilteredExpenses(newExpenses);
    }
    
    setIsFormVisible(false);
  };

  const handleSelectExpense = (expense: Expensive) => {
    setFormExpense(expense);
    setIsFormVisible(true);
  };

  const handleDeleteExpense = (expenseId: number) => {
    const updatedExpenses = expenses.filter(expense => expense.expenseId !== expenseId);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const getFormTitle = () => {
    return formExpense.expenseId === Math.max(...expenses.map(e => e.expenseId), 0) + 1 ? 'Add Expense' : 'Update Expense';
  };

  return (
    <div className="expensive-page">
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by any field"
          onChange={handleSearch}
          value={searchTerm}
          className="search-input"
        />
        <button className="add-btn" onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div className={`content ${isFormVisible ? 'split-view' : ''}`}>
        <div className="expensive-list-container">
          <table className="expensive-list">
            <thead>
              <tr>
                <th>Expense ID</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.expenseId}>
                  <td>{expense.expenseId}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td className="actions">
                    <button className="update-btn" onClick={() => handleSelectExpense(expense)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteExpense(expense.expenseId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="expensive-form-container">
            <h2>{getFormTitle()}</h2>
            <div className="expensive-form">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formExpense.date}
                onChange={handleFormChange}
              />
              <label>Expense ID</label>
              <input
                type="number"
                name="expenseId"
                value={formExpense.expenseId}
                onChange={handleFormChange}
                readOnly={formExpense.expenseId !== Math.max(...expenses.map(e => e.expenseId), 0) + 1}
              />
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formExpense.category}
                onChange={handleFormChange}
              />
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formExpense.amount}
                onChange={handleFormChange}
              />
              <button className="save-btn" onClick={handleSaveExpense}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expensive;
