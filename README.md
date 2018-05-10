# bunyan-webhook
[![bunyan-webhook](http://img.shields.io/npm/v/bunyan-webhook.svg?style=flat-square)](https://www.npmjs.com/package/bunyan-webhook)
[![bunyan-webhook](http://img.shields.io/npm/dm/bunyan-webhook.svg?style=flat-square)](https://www.npmjs.com/package/bunyan-webhook)
[![bunyan-webhook](http://img.shields.io/npm/l/bunyan-webhook.svg?style=flat-square)](https://www.npmjs.com/package/bunyan-webhook)

**Bunyan stream for Generic webhook integration**

First install bunyan...

```
npm install bunyan
```

Then install bunyan-webhook

```
npm install bunyan-webhook
```

## Basic Setup

```javascript
var bunyan  = require("bunyan"),
	BunyanSlack = require('bunyan-webhook'),
	log;

log = bunyan.createLogger({
	name: "myApp",
	stream: new BunyanWebhook({
		webhook_url: "your_webhook_url"
	}),
	level: "error"
});

log.error("hello bunyan webhook");
```
You can also pass an optional error handler.

```javascript
new BunyanWebhook({
	webhook_url: "your_webhook_url"
}, function(error){
	console.log(error);
});
```

## Authors
* [Garrett Sutula](https://github.com/garrettsutula/)
* [Seth Pollack](https://github.com/sethpollack)

***
This library was adapted from  [bunyan-slack](https://github.com/qualitybath/bunyan-slack)

The MIT License  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
