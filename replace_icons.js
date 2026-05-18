const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

const replacements = {
  '👤': '<i data-lucide="user"></i>',
  '💼': '<i data-lucide="briefcase"></i>',
  '🚀': '<i data-lucide="rocket"></i>',
  '⚡': '<i data-lucide="zap"></i>',
  '🎓': '<i data-lucide="graduation-cap"></i>',
  '🏢': '<i data-lucide="building-2"></i>',
  '💊': '<i data-lucide="pill"></i>',
  '✅': '<i data-lucide="check-circle-2"></i>',
  '❤️': '<i data-lucide="heart"></i>',
  '📊': '<i data-lucide="bar-chart-2"></i>',
  '🌏': '<i data-lucide="globe"></i>',
  '💰': '<i data-lucide="coins"></i>',
  '🏆': '<i data-lucide="trophy"></i>',
  '⭐': '<i data-lucide="star"></i>',
  '📉': '<i data-lucide="trending-down"></i>',
  '🏟️': '<i data-lucide="users"></i>',
  '🤖': '<i data-lucide="bot"></i>',
  '🚗': '<i data-lucide="car"></i>',
  '📜': '<i data-lucide="scroll"></i>',
  '🏦': '<i data-lucide="landmark"></i>',
  '🛵': '<i data-lucide="utensils"></i>',
  '🛒': '<i data-lucide="shopping-cart"></i>',
  '🖥️': '<i data-lucide="monitor"></i>',
  '🌐': '<i data-lucide="globe"></i>',
  '🏅': '<i data-lucide="medal"></i>',
  '📐': '<i data-lucide="ruler"></i>',
  '☁️': '<i data-lucide="cloud"></i>',
  '🔍': '<i data-lucide="search"></i>',
  '📈': '<i data-lucide="trending-up"></i>',
  '🌩️': '<i data-lucide="cloud-lightning"></i>',
  '🤝': '<i data-lucide="handshake"></i>',
  '💡': '<i data-lucide="lightbulb"></i>',
  '💻': '<i data-lucide="laptop"></i>',
  '📚': '<i data-lucide="book-open"></i>',
  '🏫': '<i data-lucide="school"></i>',
  '🎭': '<i data-lucide="ticket"></i>',
  '✉️': '<i data-lucide="mail"></i>',
  '✉': '<i data-lucide="mail"></i>',
  '📱': '<i data-lucide="smartphone"></i>',
  '📍': '<i data-lucide="map-pin"></i>'
};

for (const [emoji, lucideIcon] of Object.entries(replacements)) {
  content = content.split(emoji).join(lucideIcon);
}

// Ensure the Lucide CDN is added before the closing body tag
if (!content.includes('unpkg.com/lucide')) {
  content = content.replace('</body>', '  <script src="https://unpkg.com/lucide@latest"></script>\n</body>');
}

fs.writeFileSync(indexPath, content, 'utf-8');
console.log('Icons replaced successfully.');
