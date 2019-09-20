import watch from 'node-watch';
import fs from 'fs';
import log from './helper';

export class DirWatcher {
	
	constructor() {
		console.log('DirWatcher start');
		
		this.watcher;
		this.files = [];
	}
	
	watch(path) {
		fs.readdir(path, (error, files) => this.files = files);

		this.watcher = watch(path, {
			filter: '/\.csv$/',
			delay: 1000
		}, (eventType, filename) => {
			log(`event type is: ${eventType}`)
			if (filename) {
				log(`filename: ${filename}`)
			}
		})
	}
	
	closeWather() {
		this.watcher.close();
	}

	get isCloseWatcher() {
		return this.watcher.isClosed();
	}
}
