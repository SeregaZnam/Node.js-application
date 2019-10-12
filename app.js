import {DirWatcher} from './main/dir-watcher';
import {Importer} from './main/importer';

// const watcher = new DirWatcher();
// watcher.watch('./data');

// const importer = new Importer(watcher);

// importer.import()
// 	.then(d => console.log(d))
// 	.catch(e => console.log(e));
// 	

import http from 'http';
import fs from 'fs';

http.createServer((request, response) => {
	if (request.url !== '/favicon.ico') {

		if (request.url.endsWith('.css')) {
			let cssFile = request.url.slice(1);

			fs.readFile(cssFile, (err, data) => {
				if (err) throw err;

				response.setHeader('Content-Type', 'text/css');
				response.statusCode = 200;
				response.write(data);
				response.end();
			});
		} else if (request.url.endsWith('.js')) {
			let jsFile = request.url.slice(1);

			fs.readFile(jsFile, (err, data) => {
				if (err) throw err;

				response.setHeader('Content-Type', 'text/javascript');
				response.statusCode = 200;
				response.write(data);
				response.end();
			});
		} else {
			getPage(request.url, response);
		}
	}
}).listen(8888);

function getPage(name, response, statusCode = 200) {
	name = name == '/'
		? 'index'
		: name

	fs.readFile(`pages/${name}.html`, 'utf8', (err, data) => {
		if (!err) {

			fs.readFile('pages/elems/menu.html', 'utf8', (err, menu) => {
				if (err) throw err;
				
				data = data.replace(/\{\{menu\}\}/g, menu);

				fs.readFile('pages/elems/footer.html', (err, footer) => {
					if (err) throw err;

					data = data.replace(/\{\{footer\}\}/g, footer);
					response.setHeader('Content-Type', 'text/html');
					response.statusCode = statusCode;
					response.write(data);
					response.end();
				});
			})

		} else {
			if (statusCode !== 404) {
				getPage('404', response, 404);
			} else {
				throw err;
			}
		}
	});
}
