import React from 'react';

export const EmailTemplate = ({ order }) => (
  <div style={{
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #f0f0f0',
    borderRadius: '12px',
    backgroundColor: '#ffffff'
  }}>
    <h1 style={{ color: '#000', textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        GlowCart
    </h1>
    <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>
      Order Confirmation
    </h2>
    <p style={{ fontSize: '16px' }}>Hi {order.address.fullName},</p>
    <p style={{ fontSize: '16px' }}>
      Thank you for shopping with us! Your order has been placed successfully and we are preparing it for shipment.
    </p>

    <div style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        Order Details
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', paddingBottom: '10px' }}>Item</th>
            <th style={{ textAlign: 'right', paddingBottom: '10px' }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '5px 0', fontSize: '15px' }}>{item.product.name}</td>
              <td style={{ textAlign: 'right', padding: '5px 0', fontSize: '15px' }}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ borderTop: '1px solid #ddd', marginTop: '15px', paddingTop: '15px' }}>
        <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span><strong>Total Amount:</strong></span>
          <span style={{ float: 'right' }}>₹{order.amount}</span>
        </p>
        <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span><strong>Payment Method:</strong></span>
          <span style={{ float: 'right' }}>{order.paymentMethod}</span>
        </p>
      </div>
    </div>

    <div style={{ fontSize: '14px', color: '#666', marginTop: '30px', textAlign: 'center' }}>
      <p>If you have any questions, please contact our support team.</p>
      <p>&copy; 2026 GlowCart. All rights reserved.</p>
    </div>
  </div>
);
