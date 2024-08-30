import React, { useState, useEffect } from 'react';
import './Invoice.css';

interface Invoice {
  id: number;
  name: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string;
}

const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [formInvoice, setFormInvoice] = useState<Invoice>({
    id: 0,
    name: '',
    amount: 0,
    issueDate: '',
    dueDate: '',
    status: 'Pending',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialInvoices: Invoice[] = [
      { id: 1, name: 'Invoice 1', amount: 100, issueDate: '2023-01-01', dueDate: '2023-01-10', status: 'Paid' },
      { id: 2, name: 'Invoice 2', amount: 200, issueDate: '2023-02-01', dueDate: '2023-02-10', status: 'Pending' },
    ];
    setInvoices(initialInvoices);
    setFilteredInvoices(initialInvoices);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = invoices.filter(invoice =>
      Object.values(invoice).some(value =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredInvoices(filtered);
  };

  const handleAddInvoice = () => {
    setIsFormVisible(true);
    setFormInvoice({
      id: 0, // Set to 0 to trigger "Add Invoice" title
      name: '',
      amount: 0,
      issueDate: '',
      dueDate: '',
      status: 'Pending',
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Eğer sayı alanıysa, değeri sayıya çeviriyoruz
    const updatedValue = name === 'id' || name === 'amount' ? parseInt(value) || 0 : value;

    setFormInvoice({ ...formInvoice, [name]: updatedValue });
  };

  const handleSaveInvoice = () => {
    const existingInvoiceIndex = invoices.findIndex(inv => inv.id === formInvoice.id);
    let updatedInvoices;
    if (existingInvoiceIndex !== -1) {
      updatedInvoices = invoices.map(inv => inv.id === formInvoice.id ? formInvoice : inv);
    } else {
      updatedInvoices = [...invoices, formInvoice];
    }
    setInvoices(updatedInvoices);
    setFilteredInvoices(updatedInvoices);
    setIsFormVisible(false);
  };

  const handleSelectInvoice = (invoice: Invoice) => {
    setFormInvoice(invoice);
    setIsFormVisible(true);
  };

  const handleDeleteInvoice = (id: number) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
    setInvoices(updatedInvoices);
    setFilteredInvoices(updatedInvoices);
  };

  const getFormTitle = () => {
    return formInvoice.id === 0 ? 'Add Invoice' : 'Update Invoice';
  };

  return (
    <div className="invoice-page">
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by any field"
          onChange={handleSearch}
          value={searchTerm}
          className="search-input"
        />
        <button className="add-btn" onClick={handleAddInvoice}>Add Invoice</button>
      </div>

      <div className={`content ${isFormVisible ? 'split-view' : ''}`}>
        <div className="invoice-list-container">
          <table className="invoice-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.name}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.issueDate}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.status}</td>
                  <td className="actions">
                    <button className="update-btn" onClick={() => handleSelectInvoice(invoice)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="invoice-form-container">
            <h2>{getFormTitle()}</h2>
            <div className="invoice-form">
              <label>ID</label>
              <input
                type="number"
                name="id"
                value={formInvoice.id}
                onChange={handleFormChange}
              />
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formInvoice.name}
                onChange={handleFormChange}
              />
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formInvoice.amount}
                onChange={handleFormChange}
              />
              <label>Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formInvoice.issueDate}
                onChange={handleFormChange}
              />
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formInvoice.dueDate}
                onChange={handleFormChange}
              />
              <label>Status</label>
              <select
                name="status"
                value={formInvoice.status}
                onChange={handleFormChange}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
              <button className="add-btn" onClick={handleSaveInvoice}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
