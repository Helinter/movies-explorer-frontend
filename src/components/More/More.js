function More({ showButton = true }) {
  if (!showButton) {
    return (
      <div className="more" style={{ marginBottom: '140px' }}>
        {/* Пустой блок без кнопки */}
      </div>
    );
  }

  return (
    <div className="more">
      <button type="button" className="more__button">
        Ещё
      </button>
    </div>
  );
}

export default More;