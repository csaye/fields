import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div>
      <Link href="/game">
        <a>Game</a>
      </Link>
    </div>
  );
}
