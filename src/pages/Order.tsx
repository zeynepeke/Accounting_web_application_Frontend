import React, { useState } from 'react';
import './Order.css';

interface Order {
  id: number;
  date: string;
  orderNumber: string;
  owner: string;
  status: string;
  amount: string;
}

const Order: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, date: '01/01/2024', orderNumber: '123456', owner: 'John Doe', status: 'Pending', amount: '$100' },
    // Diğer siparişler buraya eklenebilir
  ]);
  const [newOrder, setNewOrder] = useState<Order>({
    id: Date.now(),
    date: '',
    orderNumber: '',
    owner: '',
    status: '',
    amount: ''
  });
  
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = () => {
    if (newOrder.date && newOrder.orderNumber && newOrder.owner && newOrder.status && newOrder.amount) {
      setOrders([...orders, { ...newOrder, id: Date.now() }]);
      setNewOrder({
        id: Date.now(),
        date: '',
        orderNumber: '',
        owner: '',
        status: '',
        amount: ''
      });
    }
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setNewOrder(order); // Formu düzenleme için doldur
  };

  const handleUpdateOrder = () => {
    if (editingOrder) {
      setOrders(orders.map(o => (o.id === editingOrder.id ? editingOrder : o)));
      setEditingOrder(null);
      setNewOrder({
        id: Date.now(),
        date: '',
        orderNumber: '',
        owner: '',
        status: '',
        amount: ''
      }); // Formu sıfırla
    }
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="dashboard-container">
      <aside>
        <div className="dashboard-sidebar">
          <a href="#">
            <span className="material-symbols-sharp">grid_view</span>
            <h3>Dashboard</h3>
          </a>
          <a href="#" className="active">
            <span className="material-symbols-sharp">person_outline</span>
            <h3>Profile</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">receipt_long</span>
            <h3>Invoice</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">sell</span>
            <h3>Revenue</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">payments</span>
            <h3>Expense</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">shopping_cart</span>
            <h3>Order</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">widgets</span>
            <h3>Product</h3>
          </a>
        </div>
      </aside>
      <div className="main-content">
        <div className="order-header">
          <h1>Order</h1>
        </div>
        <div className="order-form">
          <label htmlFor="orderDate">Date:</label>
          <input type="date" id="orderDate" name="date" value={newOrder.date} onChange={handleChange} />

          <label htmlFor="orderNumber">Order No:</label>
          <input type="text" id="orderNumber" name="orderNumber" value={newOrder.orderNumber} onChange={handleChange} />

          <label htmlFor="orderOwner">Order Owner:</label>
          <input type="text" id="orderOwner" name="owner" value={newOrder.owner} onChange={handleChange} />

          <label htmlFor="orderStatus">Order Status:</label>
          <input type="text" id="orderStatus" name="status" value={newOrder.status} onChange={handleChange} />

          <label htmlFor="totalAmount">Total Amount:</label>
          <input type="text" id="totalAmount" name="amount" value={newOrder.amount} onChange={handleChange} />

          {editingOrder ? (
            <button type="button" onClick={handleUpdateOrder}>Update Order</button>
          ) : (
            <button type="button" onClick={handleAddOrder}>Add Order</button>
          )}
        </div>
        <table className="order-list">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order No</th>
              <th>Order Owner</th>
              <th>Order Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.orderNumber}</td>
                <td>{order.owner}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                  <button className="btn-edit" onClick={() => handleEditOrder(order)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          {/* Yalnızca bir tane "Add Order" butonu eklemek için formun üst kısmındaki butonu kullanıyoruz */}
        </div>
      </div>
    </div>
  );
};

export default Order;
