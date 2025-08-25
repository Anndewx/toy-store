import React from 'react';

const CartModal = ({ cartItems, onClose }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>ตะกร้าสินค้า</h2>
        {cartItems.length === 0 ? (
          <p style={styles.text}>ไม่มีสินค้าที่เลือก</p>
        ) : (
          <ul style={styles.list}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.listItem}>
                {item.name} - ฿{item.price}
              </li>
            ))}
          </ul>
        )}
        <p style={styles.total}>รวม: ฿{total}</p>
        <button style={styles.closeButton} onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    width: '320px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
    background: '#f0f6ff'
  },
  title: {
    fontSize: '22px',
    marginBottom: '12px',
    color: '#003366',
    textAlign: 'center'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '12px'
  },
  listItem: {
    marginBottom: '8px',
    color: '#333'
  },
  total: {
    fontWeight: 'bold',
    color: '#000'
  },
  closeButton: {
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '12px'
  },
  text: {
    textAlign: 'center',
    color: '#555'
  }
};

export default CartModal;
