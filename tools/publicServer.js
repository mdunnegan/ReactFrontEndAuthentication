import express from 'express';  
import path from 'path';  
import open from 'open';  
import compression from 'compression';  
import favicon from 'serve-favicon';

console.log("In publicServer");

/*eslint-disable no-console */

const port = process.env.PORT || 3000;  
const app = express();

app.use(compression());  
app.use(express.static('public'));  

app.get('*', function(req, res) {  
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log("About to listen on port " + port);

app.listen(port, function(err) {  
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
