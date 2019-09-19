import * as config from './config/config.json';
import {Product, User} from './models';

console.log(config.name);

const user = new User();
const product = new Product();
