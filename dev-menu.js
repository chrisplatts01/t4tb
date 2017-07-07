var fs = require('fs');


// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }

// var path = process.argv[2];
var path = 'dist';

fs.readdir(path, function(err, items) {
    console.log('<nav class="dev-menu"><ul>');
    for (var i = 0; i < items.length; i++) {
      if (items[i].substr(-5) === '.html') {
        console.log('<li><a href="' + items[i] + '" target="_blank">' + items[i] + '</a></li>');
      }
    }
    console.log('</ul></nav>');
});
