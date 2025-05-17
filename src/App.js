import React, { useState } from 'react';
import './style/App.css';

function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('dramatique');
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [gifUrl, setGifUrl] = useState('');
  const [soundUrl, setSoundUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  const tones = [
    { value: 'dramatique', label: 'Dramatique' },
    { value: 'ironique', label: 'Ironique' },
    { value: 'cringe', label: 'Ultra cringe' },
    { value: 'classe', label: 'Classe' },
    { value: 'touchant', label: 'Touchant' },
    { value: 'absurde', label: 'Absurde' },
    { value: 'passif-agressif', label: 'Passif-agressif' },
    { value: 'honnete', label: 'Honnête' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Générer une URL unique (simulée ici)
    const uniqueId = Math.random().toString(36).substring(2, 9);
    setPageUrl(`https://theend.page/${uniqueId}`);
    setIsPublished(true);
  };

  const resetForm = () => {
    setIsPublished(false);
    setPageUrl('');
  };

  const getToneStyles = () => {
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
      <header>
        <h1>TheEnd.page</h1>
        <p>Créez votre page de départ inoubliable</p>
      </header>

      <main>
        {!isPublished ? (
          <div className="creator">
            <form onSubmit={handleSubmit}>
              <div class="input-group">
                <input required="" type="text" name="text" autocomplete="off" class="input" onChange={(e) => setName(e.target.value)}></input>
                  <label class="user-label">Votre Nom</label>
              </div>
              <br></br>
              <div class="input-group">
                <input required="" type="text" name="text" autocomplete="off" class="input" onChange={(e) => setTitle(e.target.value)}></input>
                  <label class="user-label">Titre de votre page</label>
              </div>
              <br></br>
              <div class="input-group">
                <input required="" type="text" name="text" autocomplete="off" class="input" onChange={(e) => setTone(e.target.value)}></input>
                  <label class="user-label">Ton de votre message</label>
              </div>
              <br></br>
              <div class="input-group">
                <input required="" type="text" name="text" autocomplete="off" class="input" onChange={(e) => setMessage(e.target.value)}></input>
                  <label class="user-label">Votre message</label>
              </div>
              <br></br>
              <div className="form-group">
                <label>Couleur de fond</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Couleur du texte</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Ton de votre message</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>GIF (URL)</label>
                <input
                  type="url"
                  value={gifUrl}
                  onChange={(e) => setGifUrl(e.target.value)}
                  placeholder="https://example.com/your-gif.gif"
                />
              </div>

              <div className="form-group">
                <label>Son (URL)</label>
                <input
                  type="url"
                  value={soundUrl}
                  onChange={(e) => setSoundUrl(e.target.value)}
                  placeholder="https://example.com/your-sound.mp3"
                />
              </div>

              <button type="submit">Créer ma page</button>
            </form>

            <div className="preview">
              <h3>Aperçu</h3>
              <div
                className="page-preview"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  ...getToneStyles()
                }}
              >
                <h2>{title || "(Titre de votre page)"}</h2>
                <p>Par {name || "(Votre nom)"}</p>
                <div className="message">
                  {message || "(Votre message apparaîtra ici)"}
                </div>
                {gifUrl && <img src={gifUrl} alt="GIF d'humeur" className="gif-preview" />}
                {soundUrl && (
                  <div className="sound-preview">
                    <audio controls src={soundUrl}>
                      Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="published">
            <h2>Votre page est prête !</h2>
            <div
              className="final-page"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                ...getToneStyles()
              }}
            >
              <h2>{title}</h2>
              <p>Par {name}</p>
              <div className="message">{message}</div>
              {gifUrl && <img src={gifUrl} alt="GIF d'humeur" />}
              {soundUrl && (
                <audio controls src={soundUrl}>
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
              )}
            </div>
            <div className="share-section">
              <p>Partagez votre page :</p>
              <input type="text" value={pageUrl} readOnly />
              <button onClick={() => navigator.clipboard.writeText(pageUrl)}>
                Copier le lien
              </button>
              <button onClick={resetForm}>Créer une autre page</button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>TheEnd.page - Parce que si c'est la fin, autant la rendre inoubliable.</p>
      </footer>
    </div>
  );
}

export default App;