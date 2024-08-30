import React, { useState, useEffect } from 'react';
import './Order.css';

interface Order {
  date: string;
  orderId: number;
  owner: string;
  status: string;
  totalAmount: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [formOrder, setFormOrder] = useState<Order>({
    date: '',
    orderId: 0,
    owner: '',
    status: 'Pending',
    totalAmount: 0,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialOrders: Order[] = [
      { date: '2024-01-01', orderId: 1, owner: 'John Doe', status: 'Completed', totalAmount: 100 },
      { date: '2024-02-01', orderId: 2, owner: 'Jane Smith', status: 'Pending', totalAmount: 200 },
    ];
    setOrders(initialOrders);
    setFilteredOrders(initialOrders);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = orders.filter(order =>
      Object.values(order).some(value =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredOrders(filtered);
  };

  const handleAddOrder = () => {
    setIsFormVisible(true);
    setFormOrder({
      date: '',
      orderId: Math.max(...orders.map(o => o.orderId), 0) + 1, // Otomatik olarak yeni Order ID atanıyor
      owner: '',
      status: 'Pending',
      totalAmount: 0,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormOrder({ ...formOrder, [e.target.name]: e.target.value });
  };

  const handleSaveOrder = () => {
    const existingOrderIndex = orders.findIndex(order => order.orderId === formOrder.orderId);

    if (existingOrderIndex !== -1) {
      // Mevcut order'ı güncelle
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex] = formOrder;
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } else {
      // Yeni bir order ekle
      const newOrders = [...orders, formOrder];
      setOrders(newOrders);
      setFilteredOrders(newOrders);
    }
    
    setIsFormVisible(false);
  };

  const handleSelectOrder = (order: Order) => {
    setFormOrder(order);
    setIsFormVisible(true);
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  const getFormTitle = () => {
    return formOrder.orderId === Math.max(...orders.map(o => o.orderId), 0) + 1 ? 'Add Order' : 'Update Order';
  };

  return (
    <div className="order-page">
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by any field"
          onChange={handleSearch}
          value={searchTerm}
          className="search-input"
        />
        <button className="add-btn" onClick={handleAddOrder}>Add Order</button>
      </div>

      <div className={`content ${isFormVisible ? 'split-view' : ''}`}>
        <div className="order-list-container">
          <table className="order-list">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>{order.owner}</td>
                  <td>{order.status}</td>
                  <td>{order.totalAmount}</td>
                  <td className="actions">
                    <button className="update-btn" onClick={() => handleSelectOrder(order)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDeleteOrder(order.orderId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="order-form-container">
            <h2>{getFormTitle()}</h2>
            <div className="order-form">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formOrder.date}
                onChange={handleFormChange}
              />
              <label>Order ID</label>
              <input
                type="number"
                name="orderId"
                value={formOrder.orderId}
                onChange={handleFormChange}
                readOnly={formOrder.orderId !== Math.max(...orders.map(o => o.orderId), 0) + 1} // Güncellemelerde ID'yi değiştirilemez yap
              />
              <label>Owner</label>
              <input
                type="text"
                name="owner"
                value={formOrder.owner}
                onChange={handleFormChange}
              />
              <label>Status</label>
              <select
                name="status"
                value={formOrder.status}
                onChange={handleFormChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <label>Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formOrder.totalAmount}
                onChange={handleFormChange}
              />
              <button className="add-btn" onClick={handleSaveOrder}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
