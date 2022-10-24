import logoImg from '../../assets/logoS.png';

import './styles.css';

export function Header() {
  return (
    <header>
			<fieldset>
				<img src={logoImg} className="logo" alt="logo" />
				<h1 className="header-title">Spotify</h1>
			</fieldset>
		</header>
  )
}