import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`glass-panel ${styles.navbarContainer}`}>
        <Link href="/" className={styles.navbarLogo}>
          <div className={styles.logoIcon}>
            <span>H</span>
          </div>
          <span className={styles.logoText}>
            Hall of Fame
          </span>
        </Link>
        
        <div className={styles.navbarActions}>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
}
