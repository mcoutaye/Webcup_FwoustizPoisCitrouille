import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/App.css';
const { getPages } =  require('./db');

export default function HallOfFame() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const data = await getPages();
        setPages(data);
      } catch (err) {
        console.error('Failed to load pages:', err);
      }
    };
    loadPages();
  }, []);

  const getToneStyles = (tone) => {
    switch (tone) {
      case 'dramatique':
        return { fontFamily: 'Georgia, serif', textShadow: '0 0 10px rgba(255,0,0,0.7)' };
      case 'ironique':
        return { fontFamily: 'Courier New, monospace', fontStyle: 'italic' };
      case 'cringe':
        return { fontFamily: 'Comic Sans MS, cursive', color: 'hotpink' };
      case 'classe':
        return { fontFamily: 'Times New Roman, serif', letterSpacing: '1px' };
      case 'touchant':
        return { fontFamily: 'Arial, sans-serif', fontWeight: 'lighter' };
      case 'absurde':
        return { fontFamily: 'Papyrus, fantasy', transform: 'rotate(2deg)' };
      case 'passif-agressif':
        return { fontFamily: 'Verdana, sans-serif', textDecoration: 'underline wavy' };
      case 'honnete':
        return { fontFamily: 'Helvetica, sans-serif' };
      default:
        return {};
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <img src="./favicon.ico" alt="Logo TheEnd.page" className="logo-image" />
          <h2 className="logo-text">TheEnd.page</h2>
        </div>
        <div className="header-right">
          <p className="header-tagline">Hall of Fame des pages de départ</p>
          <Link to="/" className="hall-of-fame-link">Créer une page</Link>
        </div>
      </header>

      <main className="hall-of-fame">
        <h1>Hall of Fame</h1>
        {pages.length === 0 ? (
          <p>Aucune page créée pour le moment.</p>
        ) : (
          <div className="pages-list">
            {pages.map((page, index) => (
              <div 
                key={index} 
                className="page-card"
                style={{
                  backgroundColor: page.bgColor,
                  color: page.textColor,
                  ...getToneStyles(page.tone),
                  padding: '20px',
                  margin: '20px 0',
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {page.backgroundImageUrl && (
                  <div
                    className="background-blur"
                    style={{
                      backgroundImage: `url(${page.backgroundImageUrl})`,
                      filter: `blur(${page.blurAmount || 5}px)`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      zIndex: 0,
                    }}
                  />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2>{page.title}</h2>
                  <p>Par {page.name}</p>
                  <div className="message">{page.message}</div>
                  <div className="gifs-container">
                    {page.gifUrls.map((url, i) => (
                      url && <img key={i} src={url} alt={`GIF ${i + 1}`} style={{ maxWidth: '200px', margin: '10px' }} />
                    ))}
                  </div>
                  {page.soundUrl && (
                    <audio controls src={page.soundUrl} style={{ marginTop: '10px' }}>
                      Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                  )}
                  <div className="page-meta">
                    <small>{new Date(page.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer>
        <p>TheEnd.page - Parce que si c'est la fin, autant la rendre inoubliable.</p>
      </footer>
    </div>
  );
}