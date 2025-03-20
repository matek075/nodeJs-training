const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { appendFileSync, appendFileCallback, appendFilePromise } = require('../appendFile');

const TEST_FILE_PATH = path.join(__dirname, 'test-append.txt');
const CONTENT_TO_APPEND = 'Test content to append';

describe('File Append Tests', function() {
  
  beforeEach(function() {
    fs.writeFileSync(TEST_FILE_PATH, 'Initial content\n');
  });
  
  afterEach(function() {
    if (fs.existsSync(TEST_FILE_PATH)) {
      fs.unlinkSync(TEST_FILE_PATH);
    }
  });
  
  it('should append to file synchronously', function() {
    appendFileSync(TEST_FILE_PATH, CONTENT_TO_APPEND);
    const content = fs.readFileSync(TEST_FILE_PATH, 'utf8');
    assert.ok(content.includes('Initial content'));
    assert.ok(content.includes(CONTENT_TO_APPEND));
  });
  
  it('should append to file asynchronously with callback', function(done) {
    appendFileCallback(TEST_FILE_PATH, CONTENT_TO_APPEND, (err) => {
      if (err) return done(err);
      
      const content = fs.readFileSync(TEST_FILE_PATH, 'utf8');
      assert.ok(content.includes('Initial content'));
      assert.ok(content.includes(CONTENT_TO_APPEND));
      done();
    });
  });
  
  it('should append to file using promises', async function() {
    await appendFilePromise(TEST_FILE_PATH, CONTENT_TO_APPEND);
    const content = fs.readFileSync(TEST_FILE_PATH, 'utf8');
    assert.ok(content.includes('Initial content'));
    assert.ok(content.includes(CONTENT_TO_APPEND));
  });
});
