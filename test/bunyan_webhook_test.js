var request = require('request'),
	util = require('util'),
	sinon = require('sinon'),
	expect = require('chai').expect,
	Bunyan = require('bunyan'),
	BunyanWebhook = require('../lib/bunyan-webhook'),
	sandbox,
	errorHandler;

describe('bunyan-webhook', function () {
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		errorHandler = sandbox.spy();
		sandbox.stub(request, 'post').returns({
			on: errorHandler
		});
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe('constructor', function () {
		it('should require a webhook', function () {
			expect(function () {
				Bunyan.createLogger({
					name: 'myapp',
					stream: new BunyanWebhook({}),
					level: 'info'
				});
			}).to.throw(/webhook url cannot be null/);
		});
	});

	describe('error handler', function () {
		it('should use error handler', function (done) {
			var log = Bunyan.createLogger({
				name: 'myapp',
				stream: new BunyanWebhook({
					webhook_url: 'mywebhookurl'
				}, function (error) {
					expect(error).to.instanceof(TypeError);
					done();
				}),
				level: 'info'
			});
			log.info('foobar');
		});

		it('should use request error handler', function (done) {
			var log = Bunyan.createLogger({
				name: 'myapp',
				stream: new BunyanWebhook({
					webhook_url: 'mywebhookurl'
				}, function (error) {
					expect(error).to.eql('FAKE ERROR');
					done();
				}),
				level: 'info'
			});
			log.info('foobar');
			errorHandler.firstCall.args[1]('FAKE ERROR');
		});
	});
	/* TODO - change return signature to match expected
		describe('loggger arguments', function() {
			it('should accept a single string argument', function() {
				var log = Bunyan.createLogger({
					name: 'myapp',
					stream: new BunyanSlack({
						webhook_url: 'mywebhookurl'
					}),
					level: 'info'
				});

				var expectedResponse = {
						body: JSON.stringify({
							text: '[INFO] foobar'
						}),
						url: 'mywebhookurl'
				};

				log.info('foobar');
				sinon.assert.calledWith(request.post, expectedResponse);
			});

			it('should accept a single object argument', function() {
				var log = Bunyan.createLogger({
					name: 'myapp',
					stream: new BunyanSlack({
						webhook_url: 'mywebhookurl',
						customFormatter: function(record, levelName) {
							return {text: util.format('[%s] %s', levelName.toUpperCase(), record.error)};
						}
					}),
					level: 'info'
				});

				var expectedResponse = {
						body: JSON.stringify({
							text: '[INFO] foobar'
						}),
						url: 'mywebhookurl'
				};

				log.info({error: 'foobar'});
				sinon.assert.calledWith(request.post, expectedResponse);
			});

			it('should accept an object and string as arguments', function() {
				var log = Bunyan.createLogger({
					name: 'myapp',
					stream: new BunyanSlack({
						webhook_url: 'mywebhookurl',
						customFormatter: function(record, levelName) {
							return {text: util.format('[%s] %s & %s', levelName.toUpperCase(), record.error, record.msg)};
						}
					}),
					level: 'info'
				});

				var expectedResponse = {
						body: JSON.stringify({
							text: '[INFO] this is the error & this is the message'
						}),
						url: 'mywebhookurl'
				};
				log.info({error: 'this is the error'}, 'this is the message');
				sinon.assert.calledWith(request.post, expectedResponse);
			});
		});
	*/
});
