import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header({ isLoggedIn, setIsLoggedIn }) {
  return (
    <header>
      <nav>
        <div>
          <Link to="/">Demo Mini Capstone</Link>
          <div>
            {isLoggedIn ? (
              <>
                <Link to="/cart">Cart</Link> | <Link to="/orders">Orders</Link> | <LogoutLink setIsLoggedIn={setIsLoggedIn} />
              </>
            ) : (
              <>
                <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
