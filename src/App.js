import React, { useState } from 'react';
import './style/App.css';

function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('dramatique');
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [gifUrls, setGifUrls] = useState(['']);
  const [soundUrl, setSoundUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [errors, setErrors] = useState({});

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
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Ce champ est requis';
    if (!title.trim()) newErrors.title = 'Ce champ est requis';
    if (!message.trim()) newErrors.message = 'Ce champ est requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const uniqueId = Math.random().toString(36).substring(2, 9);
    setPageUrl(`https://theend.page/${uniqueId}`);
    setIsPublished(true);
  };

  const resetForm = () => {
    setName('');
    setTitle('');
    setMessage('');
    setTone('dramatique');
    setBgColor('#000000');
    setTextColor('#ffffff');
    setGifUrls(['']);
    setSoundUrl('');
    setIsPublished(false);
    setPageUrl('');
    setErrors({});
  };

  const handleGifChange = (index, value) => {
    const newGifs = [...gifUrls];
    newGifs[index] = value;
    setGifUrls(newGifs);
  };

  const addGifField = () => {
    setGifUrls([...gifUrls, '']);
  };

  const removeGifField = (index) => {
    const newGifs = gifUrls.filter((_, i) => i !== index);
    setGifUrls(newGifs);
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
              <div className="input-group">
                <input
                  type="text"
                  autoComplete="off"
                  className={`input ${errors.name ? 'error' : ''}`}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label className="user-label">Votre Nom</label>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <br />

              <div className="input-group">
                <input
                  type="text"
                  autoComplete="off"
                  className={`input ${errors.title ? 'error' : ''}`}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <label className="user-label">Titre de votre page</label>
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>
              <br />

              <div className="input-group">
                <input
                  type="text"
                  autoComplete="off"
                  className={`input ${errors.message ? 'error' : ''}`}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <label className="user-label">Votre message</label>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              <br />

              <div className="form-group">
                <label>Ton de votre message</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

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
                <label>GIF(s) (URL)</label>
                {gifUrls.map((url, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleGifChange(index, e.target.value)}
                      placeholder={`GIF #${index + 1} https://example.com/your-gif.gif`}
                      style={{ flex: 1, marginRight: '8px' }}
                    />
                    {gifUrls.length > 1 && (
                      <button type="button" onClick={() => removeGifField(index)}>✕</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addGifField}>Ajouter un GIF</button>
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
                {gifUrls.map((url, i) => (
                  url && <img key={i} src={url} alt={`GIF ${i + 1}`} className="gif-preview" />
                ))}
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
              {gifUrls.map((url, i) => (
                url && <img key={i} src={url} alt={`GIF ${i + 1}`} />
              ))}
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
