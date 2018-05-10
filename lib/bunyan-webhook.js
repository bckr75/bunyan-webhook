var util = require('util'),
	request = require('request');

function BunyanWebhook(url, error) {
	url = url || null;
	if (!url) {
		throw new Error('webhook url cannot be null');
	} else {
		this.webhook_url = url;
		this.error = error || function () {};
	}
}

BunyanWebhook.prototype.write = function write(record) {

	if (typeof record === 'string') {
		record = JSON.parse(record);
	}

	request.post({
			url: this.webhook_url,
			body: record,
			json: true
		})
		.on('error', function (err) {
			return this.error(err);
		});
};

module.exports = BunyanWebhook;
