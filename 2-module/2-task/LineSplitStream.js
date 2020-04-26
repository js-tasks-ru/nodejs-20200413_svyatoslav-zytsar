const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.tail = ''
  }

  _transform(chunk, encoding, callback) {
    const buffer = chunk.toString();

    [].forEach.call(buffer, char => {
      if (char === os.EOL) {
        this.push(this.tail);
        this.tail = '';
      } else {
        this.tail += char;
      }
    })

    callback();
  }

  _flush(callback) {
    if (this.tail) {
      this.push(this.tail);
    }

    callback();
  }
}

module.exports = LineSplitStream;
