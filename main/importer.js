import log from './helper';
import csv from 'csvtojson';

export class Importer {
	constructor(wather) {
		console.log('Importer start');

		this.fileData;
		this.dirWather = wather;
		this.dirWather.watcher.on('change', (event, value) => {
			log('dirwatcher:changed');
			this.path = value;
			import(value);
		});
	}

	import(value) {
		console.log(value);
		if (value) {
			this.path = value.replace('\\', '/');
			this.fileData = csv().fromFile(`./${this.path}`);
		}
		return Promise.reject('not path');
	}
}