import React, { useState } from 'react';
import './style/App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
const { savePage } = require('./db');

function Home() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('dramatique');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [gifUrls, setGifUrls] = useState(['']);
  const [soundUrl, setSoundUrl] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [errors, setErrors] = useState({});
  const [blurAmount, setBlurAmount] = useState(5);

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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!name.trim()) newErrors.name = 'Ce champ est requis';
  if (!title.trim()) newErrors.title = 'Ce champ est requis';
  if (!message.trim()) newErrors.message = 'Ce champ est requis';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  const newPage = {
    name,
    title,
    message,
    tone,
    bgColor,
    textColor,
    gifUrls: gifUrls.filter(url => url.trim() !== ''),
    soundUrl,
    backgroundImageUrl,
    blurAmount
  };

  try {
    await savePage(newPage);
    setIsPublished(true);
  } catch (err) {
    console.error('Erreur sauvegarde:', err);
    alert("Une erreur est survenue lors de la sauvegarde");
  }


  const existingPages = JSON.parse(localStorage.getItem('pages') || '[]');
  const updatedPages = [...existingPages, newPage];
  localStorage.setItem('pages', JSON.stringify(updatedPages));
};

  const resetForm = () => {
    setName('');
    setTitle('');
    setMessage('');
    setTone('dramatique');
    setBgColor('#ffffff');
    setTextColor('#000000');
    setGifUrls(['']);
    setSoundUrl('');
    setBackgroundImageUrl('');
    setIsPublished(false);
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

  const getBackgroundStyle = () => ({
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: getToneStyles().fontFamily,
    ...getToneStyles(),
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    pointerEvents: 'none',
  });

  const downloadPDF = () => {
    const page = document.querySelector('.final-page');
    if (!page) return;

    setTimeout(() => {
      const pageWidth = page.scrollWidth;
      const pageHeight = page.scrollHeight;

      html2canvas(page, {
        useCORS: true,
        scale: 2,
        windowWidth: pageWidth,
        windowHeight: pageHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('theend_page.pdf');
      });
    }, 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <img src="./favicon.ico" alt="Logo TheEnd.page" className="logo-image" />
          <h2 className="logo-text">TheEnd.page</h2>
        </div>
        <div className="header-right">
          <p className="header-tagline">Créez votre page de départ inoubliable</p>
          <Link to="/halloffame" className="hall-of-fame-link"> Hall of Fame</Link>
        </div>
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
                  placeholder='Nom Prénom'
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
                  placeholder="Pourquoi je m'en vais..."
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
                  placeholder="Racontez tout..."
                />
                <label className="user-label">Votre message</label>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              <br />

              <div className="input-group">
                <select class="select-input" value={tone} onChange={(e) => setTone(e.target.value)}>
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <label class="user-label">Ton de votre message</label>
              </div>
              <br />

              <div className="color-options">
                <div className="input-group">
                  <div className="color-wrapper">
                    <div
                      className="color-preview half-bg"
                      style={{ backgroundColor: bgColor }}
                    />
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="hidden-color"
                    />
                    <label className="user-label">Couleur de fond</label>
                  </div>
                </div>

                <div className="input-group">
                  <div className="color-wrapper">
                    <div
                      className="color-preview half-bg"
                      style={{ backgroundColor: textColor }}
                    />
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="hidden-color"
                    />
                    <label className="user-label">Couleur du texte</label>
                  </div>
                </div>
              </div>
              <br />

              <div className="input-group">
                <input
                  type="url"
                  value={backgroundImageUrl}
                  onChange={(e) => setBackgroundImageUrl(e.target.value)}
                  placeholder="https://example.com/your-background.jpg"
                  className={`input ${errors.message ? 'error' : ''}`}
                />
                <label className="user-label">Image de fond</label>
              </div>
              <br />

              <div className="form-group">
                <label>Flou du fond (en px)</label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                />
                <span>{blurAmount}px</span>
              </div>
              <br />
              <div className="input-group">
                {gifUrls.map((url, index) => (
                  <div key={index} >
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleGifChange(index, e.target.value)}
                      placeholder="https://example.com/your-gif.gif"
                      className={`input ${errors.message ? 'error' : ''}`}
                    />
                    {gifUrls.length > 1 && (
                      <button type="button" onClick={() => removeGifField(index)}>✕</button>
                    )}
                    <label className="user-label">GIF #{index + 1}</label>
                  </div>
                ))}
                <br />
                <button type="button" onClick={addGifField}>Ajouter un GIF</button>
              </div>
              <br />
              <div className="input-group">
                <input
                  type="url"
                  value={soundUrl}
                  onChange={(e) => setSoundUrl(e.target.value)}
                  placeholder="https://example.com/your-sound.mp3"
                  className={`input ${errors.message ? 'error' : ''}`}
                />
                <label className="user-label">Son (URL)</label>
              </div>
              <br />
              <button type="submit">Créer ma page</button>
            </form>

            <div className="preview">
              <h3>Aperçu</h3>
              <div className="page-preview" style={getBackgroundStyle()}>
                {backgroundImageUrl && (
                  <div
                    className="background-blur"
                    style={{
                      backgroundImage: `url(${backgroundImageUrl})`,
                      filter: `blur(${blurAmount}px)`,
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
                  <h2>{title || "(Titre de votre page)"}</h2>
                  <p>Par {name || "(Votre nom)"}</p>
                  <div className="message">{message || "(Votre message apparaîtra ici)"}</div>
                  {gifUrls.map((url, i) =>
                    url ? <img key={i} src={url} alt={`GIF ${i + 1}`} className="gif-preview" /> : null
                  )}
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
          </div>
        ) : (
          <div className="published">
            <h2>Votre page est prête !</h2>
            <div className="final-page" style={getBackgroundStyle()}>
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
              <button onClick={downloadPDF}>Télécharger en PDF</button>
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

export default Home;
