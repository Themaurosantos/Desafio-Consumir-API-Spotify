import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Header } from "../Header";

import "./styles.css";

export function LoginPage() {
  return (
    <>
      <Header />
      <div className="login-wrapper">
        <header className="hero-container"></header>

        <main>
          <section id="showcase">
            <div className="showcase-container">
              <h2>Aproveite para ouvir suas músicas</h2>
              <Marquee
                direction="left"
                speed={70}
                gradient={false}
                style={{ color: "white" }}
              >
                {" "}
                Aproveite 1 mês grátis
              </Marquee>

              <Link to="/home">
                <button className="btn-primary">Ouvir agora</button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
