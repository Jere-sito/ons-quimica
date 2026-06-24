const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function isMobilePhone(ua) {
  if (/iPad/i.test(ua)) return false;
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return false;
  return /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

app.get('/', (req, res) => {
  const force = req.query.view;
  const ua = req.headers['user-agent'] || '';
  let version;
  if (force === 'mobile') version = 'mobile';
  else if (force === 'desktop') version = 'desktop';
  else version = isMobilePhone(ua) ? 'mobile' : 'desktop';
  res.sendFile(path.join(__dirname, 'public', version, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ONS Química corriendo en http://localhost:${PORT}`);
});
