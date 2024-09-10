import React, { useState, useEffect } from 'react';
import './Revenue.css';

interface Revenue {
  date: string;
  revenueId: number;
  source: string;
  amount: number;
}

const RevenuePage: React.FC = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [filteredRevenues, setFilteredRevenues] = useState<Revenue[]>([]);
  const [formRevenue, setFormRevenue] = useState<Revenue>({
    date: '',
    revenueId: 0,
    source: '',
    amount: 0,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialRevenues: Revenue[] = [
      { date: '2024-01-15', revenueId: 1, source: 'Product Sales', amount: 1000 },
      { date: '2024-02-15', revenueId: 2, source: 'Service Income', amount: 500 },
    ];
    setRevenues(initialRevenues);
    setFilteredRevenues(initialRevenues);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = revenues.filter(revenue =>
      Object.values(revenue).some(value =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredRevenues(filtered);
  };

  const handleAddRevenue = () => {
    setIsFormVisible(true);
    setFormRevenue({
      date: '',
      revenueId: Math.max(...revenues.map(e => e.revenueId), 0) + 1,
      source: '',
      amount: 0,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormRevenue({ ...formRevenue, [e.target.name]: e.target.value });
  };

  const handleSaveRevenue = () => {
    const existingRevenueIndex = revenues.findIndex(revenue => revenue.revenueId === formRevenue.revenueId);

    if (existingRevenueIndex !== -1) {
      const updatedRevenues = [...revenues];
      updatedRevenues[existingRevenueIndex] = formRevenue;
      setRevenues(updatedRevenues);
      setFilteredRevenues(updatedRevenues);
    } else {
      const newRevenues = [...revenues, formRevenue];
      setRevenues(newRevenues);
      setFilteredRevenues(newRevenues);
    }
    
    setIsFormVisible(false);
  };

  const handleSelectRevenue = (revenue: Revenue) => {
    setFormRevenue(revenue);
    setIsFormVisible(true);
  };

  const handleDeleteRevenue = (revenueId: number) => {
    const updatedRevenues = revenues.filter(revenue => revenue.revenueId !== revenueId);
    setRevenues(updatedRevenues);
    setFilteredRevenues(updatedRevenues);
  };

  const getFormTitle = () => {
    return formRevenue.revenueId === Math.max(...revenues.map(e => e.revenueId), 0) + 1 ? 'Add Revenue' : 'Update Revenue';
  };

  return (
    <div className="revenue-page">
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by any field"
          onChange={handleSearch}
          value={searchTerm}
          className="search-input"
        />
        <button className="add-btn" onClick={handleAddRevenue}>Add Revenue</button>
      </div>

      <div className={`content ${isFormVisible ? 'split-view' : ''}`}>
        <div className="revenue-list-container">
          <table className="revenue-list">
            <thead>
              <tr>
                <th>Revenue ID</th>
                <th>Date</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenues.map(revenue => (
                <tr key={revenue.revenueId}>
                  <td>{revenue.revenueId}</td>
                  <td>{revenue.date}</td>
                  <td>{revenue.source}</td>
                  <td>{revenue.amount}</td>
                  <td className="actions">
                    <button className="update-btn" onClick={() => handleSelectRevenue(revenue)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteRevenue(revenue.revenueId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="revenue-form-container">
            <h2>{getFormTitle()}</h2>
            <div className="revenue-form">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formRevenue.date}
                onChange={handleFormChange}
              />
              <label>Revenue ID</label>
              <input
                type="number"
                name="revenueId"
                value={formRevenue.revenueId}
                onChange={handleFormChange}
                readOnly={formRevenue.revenueId !== Math.max(...revenues.map(e => e.revenueId), 0) + 1}
              />
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={formRevenue.source}
                onChange={handleFormChange}
              />
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formRevenue.amount}
                onChange={handleFormChange}
              />
              <button className="save-btn" onClick={handleSaveRevenue}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenuePage;
