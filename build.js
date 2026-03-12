const fs   = require('fs');
const path = require('path');

// ─── Minifiers (pure Node.js, zero dependencies) ──────────────────────────────

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{}();,])\s*/g, '$1')
    .replace(/\s*=\s*/g, '=')
    .replace(/\s*\+\s*/g, '+')
    .replace(/\s*\|\|\s*/g, '||')
    .replace(/\s*&&\s*/g, '&&')
    .trim();
}

function bytesToKB(b) {
  return (b / 1024).toFixed(1) + 'KB';
}

// ─── Load builds.json ─────────────────────────────────────────────────────────

if (!fs.existsSync('./builds.json')) {
  console.error('❌  builds.json not found in repo root');
  process.exit(1);
}

const { bundles } = JSON.parse(fs.readFileSync('./builds.json', 'utf8'));

if (!Array.isArray(bundles) || bundles.length === 0) {
  console.error('❌  No bundles defined in builds.json');
  process.exit(1);
}

// ─── Process each bundle ──────────────────────────────────────────────────────

console.log('\n════════════════════════════════════════════');
console.log('  CMS Component Builder');
console.log('════════════════════════════════════════════\n');

bundles.forEach(bundle => {
  const { name, distFolder, components } = bundle;

  console.log('Bundle: ' + name);
  console.log('Output: ' + distFolder + '/');
  console.log('Components: ' + components.join(', '));
  console.log('────────────────────────────────────────────');

  let allCSS = '';
  let allJS  = '';

  components.forEach(component => {
    const dir     = path.join('./components', component);
    const cssFile = path.join(dir, component + '.css');
    const jsFile  = path.join(dir, component + '.js');

    if (!fs.existsSync(dir)) {
      console.warn('  ⚠️  Skipping "' + component + '" — folder not found');
      return;
    }

    if (fs.existsSync(cssFile)) {
      allCSS += '/* === ' + component + ' === */\n' + fs.readFileSync(cssFile, 'utf8') + '\n\n';
      console.log('  ✅ CSS: ' + component);
    } else {
      console.warn('  ⚠️  No CSS: ' + component);
    }

    if (fs.existsSync(jsFile)) {
      allJS += '/* === ' + component + ' === */\n' + fs.readFileSync(jsFile, 'utf8') + '\n\n';
      console.log('  ✅ JS:  ' + component);
    } else {
      console.warn('  ⚠️  No JS:  ' + component);
    }
  });

  // Write dist folder
  fs.mkdirSync(distFolder, { recursive: true });

  const minCSS = minifyCSS(allCSS);
  const minJS  = minifyJS(allJS);

  fs.writeFileSync(path.join(distFolder, 'components.css'),     allCSS);
  fs.writeFileSync(path.join(distFolder, 'components.js'),      allJS);
  fs.writeFileSync(path.join(distFolder, 'components.min.css'), minCSS);
  fs.writeFileSync(path.join(distFolder, 'components.min.js'),  minJS);

  const savCSS = Math.round((1 - minCSS.length / allCSS.length) * 100);
  const savJS  = Math.round((1 - minJS.length  / allJS.length)  * 100);

  console.log('\n  📦 Output:');
  console.log('     components.css      ' + bytesToKB(allCSS.length));
  console.log('     components.min.css  ' + bytesToKB(minCSS.length) + '  (' + savCSS + '% smaller)');
  console.log('     components.js       ' + bytesToKB(allJS.length));
  console.log('     components.min.js   ' + bytesToKB(minJS.length)  + '  (' + savJS  + '% smaller)');
  console.log('\n  🚀 CDN URL (jsDelivr):');
  console.log('     https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/' + distFolder + '/components.min.css');
  console.log('     https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/' + distFolder + '/components.min.js');
  console.log('\n');
});

console.log('════════════════════════════════════════════');
console.log('  ✅ All bundles built successfully!');
console.log('════════════════════════════════════════════\n');
