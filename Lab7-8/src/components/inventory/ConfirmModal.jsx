export default function ConfirmModal({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h3>{title || "Ви впевнені?"}</h3>
        <p>Цю дію неможливо буде скасувати.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={onConfirm} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
            Так, видалити
          </button>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '4px' }}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}