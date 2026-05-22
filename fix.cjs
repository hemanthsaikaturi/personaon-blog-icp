const fs = require('fs');
['src/components/BlogD.jsx', 'src/components/BlogE.jsx'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync(f, c);
});
console.log('Fixed escaping!');
