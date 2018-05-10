var util = require('util'),
request  = require('request'),
extend   = require('extend.js');

function BunyanWebhook(options, error) {
	options = options || {};
	if (!options.webhook_url && !options.webhookUrl) {
		throw new Error('webhook url cannot be null');
	} else {

		this.webhook_url     = options.webhook_url || options.webhookUrl;
		this.error           = error               || function() {};

	}
}

BunyanWebhook.prototype.write = function write(record) {
	var self = this;

	if (typeof record === 'string') {
		record = JSON.parse(record);
	}

	request.post({
		url: self.webhook_url,
		body: JSON.stringify(record)
	})
	.on('error', function(err) {
		return self.error(err);
	});
};

module.exports = BunyanWebhook;
