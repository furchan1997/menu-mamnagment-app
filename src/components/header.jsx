function Header({ title = "", description = "" }) {
  return (
    <header className="summary">
      <h2>{title}</h2>
    </header>
  );
}

export default Header;
