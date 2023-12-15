function More({ showButton = true, onClick }) {
  if (!showButton) {
    return (
      <div className="more" style={{ marginBottom: '140px' }}>
        {/* Пустой блок без кнопки */}
      </div>
    );
  }

  return (
    <section className="more">
      <button type="button" className="more__button" onClick={onClick}>
        Ещё
      </button>
    </section>
  );
}

export default More;
