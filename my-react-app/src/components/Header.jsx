//import "./Header.css"; // 必要なら個別CSSも作成可能

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">MealMax</h1>
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
