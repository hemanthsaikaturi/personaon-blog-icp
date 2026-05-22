const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.css') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
};

const files = walk('c:/Users/ASUS/Desktop/hemanth/PersonaOn_BLOG-ICP/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Colors
  content = content.replace(/rgba\(255,\s*255,\s*255,/g, 'rgba(0,0,0,');
  content = content.replace(/rgba\(255,255,255,/g, 'rgba(0,0,0,');
  
  // Specific dark bgs
  content = content.replace(/rgba\(6,\s*17,\s*30,/g, 'rgba(255,255,255,');
  content = content.replace(/rgba\(6,17,30,/g, 'rgba(255,255,255,');
  
  // Deep dark hexes
  content = content.replace(/#040c14/gi, '#ffffff');
  content = content.replace(/#0a1520/gi, '#f1f5f9');
  content = content.replace(/#06111e/gi, '#e2e8f0');
  content = content.replace(/#0f1724/gi, '#f8fafc');
  content = content.replace(/#030910/gi, '#f8fafc');
  
  // Some hardcoded rgba(0,0,0, 0.x) needs to be lighter, otherwise they are very dark on white
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.5\)/g, 'rgba(0,0,0,0.04)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.4\)/g, 'rgba(0,0,0,0.03)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.3\)/g, 'rgba(0,0,0,0.03)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.2\)/g, 'rgba(0,0,0,0.02)');
  content = content.replace(/rgba\(0,0,0,0\.5\)/g, 'rgba(0,0,0,0.04)');
  content = content.replace(/rgba\(0,0,0,0\.4\)/g, 'rgba(0,0,0,0.03)');
  content = content.replace(/rgba\(0,0,0,0\.3\)/g, 'rgba(0,0,0,0.03)');
  content = content.replace(/rgba\(0,0,0,0\.2\)/g, 'rgba(0,0,0,0.02)');
  content = content.replace(/rgba\(0,0,0,0\.25\)/g, 'rgba(0,0,0,0.03)');
  
  // Specific gradients
  content = content.replace(/#fff1f5 15%, #fda4af 55%, #9f1239 100%/g, '#e11d48 15%, #be123c 55%, #881337 100%');
  content = content.replace(/#fff 30%, #64748b 100%/g, '#1e293b 30%, #475569 100%');
  
  // Switcher bar bg
  content = content.replace(/rgba\(2,\s*11,\s*20,\s*0\.92\)/g, 'rgba(255, 255, 255, 0.92)');

  fs.writeFileSync(file, content);
});

console.log("Replaced colors for light mode!");
