require('styles/style.css') // remember to add style-loader and css-loader to the webpack rules for css
import Dragon from '../src'
import { DragonChild } from '../src'

var container = document.getElementById('dragon-container');
console.log(container)
var instance = new Dragon(container, {
    width: "500px",
    height: "500px",
});

instance.init();

/*
var testChild = document.getElementById('dragon-test')

var test = new DragonChild(testChild, document.getElementsByTagName("body"))
test.init()
*/
