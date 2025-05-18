// src/db.js
export async function savePage(newPage) {
  try {
    const pageWithId = {
      ...newPage,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const existingPages = JSON.parse(localStorage.getItem('theend-pages') || '[]');
    const updatedPages = [...existingPages, pageWithId];
    localStorage.setItem('theend-pages', JSON.stringify(updatedPages));

    return pageWithId;
  } catch (err) {
    console.error('Error saving page:', err);
    throw err;
  }
}

export async function getPages() {
  try {
    return JSON.parse(localStorage.getItem('theend-pages')) || [];
  } catch (err) {
    console.error('Error loading pages:', err);
    return [];
  }
}