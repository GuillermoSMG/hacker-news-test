import { header, link } from './Header.css'

const Header = () => {
  return (
    <nav className={header}>
      <img src='/logo.gif' alt='Logo Hacker News' />
      <a href='/' className={link}>HN</a>
    </nav>
  )
}
export default Header
