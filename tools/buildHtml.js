import fs from 'fs';  
import cheerio from 'cheerio';  
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('index.html', 'utf8', (err, markup) => {  
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  $('head').prepend('');

  fs.writeFile('public/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /public'.green);
  });
});

fs.readFile('style/main.css', 'utf8', (err, markup) => {  
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  $('head').prepend('');

  fs.writeFile('public/main.css', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('src/main.css written to /public'.green);
  });
});

// TODO: Error check this

fs.createReadStream('sounds/hihat2.wav').pipe(fs.createWriteStream('public/hihat2.wav'));
fs.createReadStream('sounds/snare.wav').pipe(fs.createWriteStream('public/snare.wav'));
fs.createReadStream('sounds/bass.wav').pipe(fs.createWriteStream('public/bass.wav'));
