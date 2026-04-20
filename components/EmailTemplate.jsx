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
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://res.cloudinary.com/dibnkdvve/image/upload/v1776707162/Glowcart-logo_kdpvnj.png" 
          alt="GlowCart Logo" 
          style={{ width: '160px', height: 'auto', margin: '0 auto' }}
        />
    </div>

    <h2 style={{ fontSize: '20px', color: '#111', marginBottom: '10px', fontWeight: '600' }}>
      Order Confirmed!
    </h2>
    <p style={{ fontSize: '15px', color: '#555' }}>Hi {order.address.fullName.split(' ')[0]},</p>
    <p style={{ fontSize: '15px', color: '#555' }}>
      Your GlowCart order has been placed successfully. We are getting your items ready for glowing!
    </p>

    <div style={{
      backgroundColor: '#fafafa',
      padding: '24px',
      borderRadius: '12px',
      marginTop: '24px',
      border: '1px solid #efefef'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '17px', color: '#111', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
        Order Summary
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', paddingBottom: '12px', fontSize: '13px', textTransform: 'uppercase', color: '#888' }}>Product</th>
            <th style={{ textAlign: 'right', paddingBottom: '12px', fontSize: '13px', textTransform: 'uppercase', color: '#888' }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '8px 0', fontSize: '14px', fontWeight: '500' }}>
                {item.product.name}
              </td>
              <td style={{ textAlign: 'right', padding: '8px 0', fontSize: '14px' }}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ borderTop: '1px solid #eee', marginTop: '16px', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#555' }}>Total Amount:</span>
          <span style={{ fontWeight: '700', fontSize: '16px', float: 'right' }}>₹{order.amount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#555' }}>Payment:</span>
          <span style={{ fontWeight: '500', fontSize: '14px', float: 'right', color: '#008a00' }}>{order.paymentMethod}</span>
        </div>
      </div>
    </div>

    <div style={{ fontSize: '14px', color: '#666', marginTop: '30px', textAlign: 'center' }}>
      <p>If you have any questions, please contact our support team.</p>
      <p>&copy; 2026 GlowCart. All rights reserved.</p>
    </div>
  </div>
);
