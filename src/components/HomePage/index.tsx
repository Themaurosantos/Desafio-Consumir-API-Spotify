import { Link } from "react-router-dom";
import { Player } from "../Player/Player";

import Logo from "../../assets/logoS.png";

import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../LoadingSpinner";

type Song = {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
  url: string;
  artists: Artist[];
  total: number;
  album: {
    id: string;
    name: string;
    images: Image[];
  };
};

type Artist = {
  id: string;
  name: string;
};

type Image = {
  url: string;
};

type Playlist = {
  id: string;
  name: string;
  images: Image[];
};

export function HomePage() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>();
  const [genres, setGenres] = useState([]);
  const [showRecommendationsName, setShowRecommendationsName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function getFeaturedPlaylists() {
      axios("http://localhost:3001/featuredPlaylists").then((response) => {
        setFeaturedPlaylists(response.data);
      });
    }

    async function getRecommendations() {
      const response = await axios("http://localhost:3001/recommendations");

      const data = response.data.tracks.map((response: Song) => {
        return {
          id: response?.id,
          name: response?.name,
          duration_ms: Number(response?.duration_ms),
          url: response?.preview_url,
          artists: response?.artists,
          album: {
            id: response?.album.id,
            name: response?.album.name,
            images: response?.album.images,
          },
        };
      });

      const newDisplayLists: Song[] = [];

      data.forEach((displayPlaylist: Song) => {
        if (displayPlaylist.url !== null) {
          newDisplayLists.push(displayPlaylist);
        }
      });

      setRecommendedSongs(newDisplayLists);
    }

    async function getGenres() {
      axios("http://localhost:3001/genres").then((response) =>
        setGenres(response.data.genres)
      );
    }

    getFeaturedPlaylists();
    getRecommendations();
    getGenres();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="home-wrapper">
      <header className="sidebar-container">
        <fieldset>
          <img className="home-logo" src={Logo} alt="logo" />
          <h1 className="home-title">Spotify</h1>
        </fieldset>
        <nav className="menu-lateral">
          <ul className="navbar">
            <li className="menu">
              <Link to="/">Inicio</Link>
            </li>
            <li className="menu">
              <a href="#">Buscar</a>
            </li>
            <li className="menu">
              <a href="#">Sua biblioteca</a>
            </li>
          </ul>
          <ul className="navbar-list">
            <li className="second-menu">
              <a href="#">Criar playlist</a>
            </li>
            <li className="second-menu">
              <a href="#">Músicas mais curtidas</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <section>
          <h1 className="title">Spotify playlist</h1>
          <div className="albuns">
            {featuredPlaylists.slice(0, 5).map((e: Playlist) => (
              <a key={e.id} href="#" className="href-size">
                <div className="album">
                  <img src={e.images[0].url} alt="" />
                </div>
              </a>
            ))}
          </div>
          <section className="browser">
            <div className="form-container">
              <form action="">
                <input type="hidden" id="hidden_token" />
                <div className="col-sm-6 form-group row mt-4 px-0">
                  <label htmlFor="Genre" className="form-label col-sm-2">
                    Gênero
                  </label>
                  <select
                    name=""
                    id="select_genre"
                    className="form-control form-control-sm col-sm-10"
                  >
                    <option>Selecione</option>
                    {genres.map((e: string) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6 form-group row px-0">
                  <label htmlFor="Genre" className="form-label col-sm-2">
                    Playlists:
                  </label>
                  <select
                    name=""
                    id="select_playlist"
                    className="form-control form-control-sm col-sm-10"
                  >
                    <option>Selecione</option>
                    {featuredPlaylists.map((e: Playlist) => (
                      <option key={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6 row form-group px-0">
                  <button
                    type="button"
                    id="btn_submit"
                    className="btn btn-success col-sm-12"
                    onClick={(e) =>
                      setShowRecommendationsName(!showRecommendationsName)
                    }
                  >
                    Buscar
                  </button>
                </div>
              </form>
              <div className="selected-genre-container">
                <div className="row group-list">
                  <div className="col-sm-6 px-0">
                    <div className="list-group song-list"></div>
                  </div>
                  <div className="offset-md-1 col-sm-4" id="song-detail">
                    {showRecommendationsName &&
                      recommendedSongs?.map((e) => (
                        <ul>
                          <li>{e.name}</li>
                        </ul>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <Player className="player" recommendedSongs={recommendedSongs} />
          </section>
        </section>
      </main>
    </div>
  );
}
