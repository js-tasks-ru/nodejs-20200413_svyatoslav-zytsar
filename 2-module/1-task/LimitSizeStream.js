const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit
    this.size = 0
  }

  _transform(chunk, encoding, callback) {
    this.size += Buffer.from(chunk).length;

    if (this.size > this.limit) {
      callback(new LimitExceededError());
    }

    this.push(chunk);
    callback();
  }
}

module.exports = LimitSizeStream;
