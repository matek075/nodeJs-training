const fs = require('fs');
const path = require('path');

jest.mock('fs');

const readFileModule = require('../readFile');

describe('File Reading Tests', () => {
  const mockFileContent = 'This is the content of the test file';
  const testFilePath = './test-file.txt';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Synchronous File Reading', () => {
    test('should read file synchronously', () => {
      fs.readFileSync.mockReturnValue(mockFileContent);
      
      const consoleSpy = jest.spyOn(console, 'log');
      
      const result = readFileModule.readFileSync(testFilePath);
      
      expect(fs.readFileSync).toHaveBeenCalledWith(testFilePath, expect.any(Object));
      
      expect(result).toBe(mockFileContent);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('File content (sync)'));
      
      consoleSpy.mockRestore();
    });

    test('should handle errors when reading file synchronously', () => {
      const error = new Error('File not found');
      fs.readFileSync.mockImplementation(() => {
        throw error;
      });
      
      const consoleSpy = jest.spyOn(console, 'error');
      
      const result = readFileModule.readFileSync(testFilePath);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading file synchronously'), error);
      
      expect(result).toBe('');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Asynchronous File Reading with Callback', () => {
    test('should read file asynchronously with callback', (done) => {
      fs.readFile.mockImplementation((path, options, callback) => {
        callback(null, mockFileContent);
      });
      
      const consoleSpy = jest.spyOn(console, 'log');
      
      readFileModule.readFileCallback(testFilePath, (content) => {
        expect(fs.readFile).toHaveBeenCalledWith(testFilePath, expect.any(Object), expect.any(Function));
        
        expect(content).toBe(mockFileContent);
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('File content (callback)'));
        
        consoleSpy.mockRestore();
        done();
      });
    });

    test('should handle errors when reading file asynchronously with callback', (done) => {
      const error = new Error('File not found');
      fs.readFile.mockImplementation((path, options, callback) => {
        callback(error, null);
      });
      
      const consoleSpy = jest.spyOn(console, 'error');
      
      readFileModule.readFileCallback(testFilePath, (content) => {
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading file asynchronously'), error);
        
        expect(content).toBe('');
        
        consoleSpy.mockRestore();
        done();
      });
    });
  });

  describe('File Reading with Promises', () => {
    test('should read file using promises', async () => {
      fs.promises = { readFile: jest.fn() };
      fs.promises.readFile.mockResolvedValue(mockFileContent);
      
      const consoleSpy = jest.spyOn(console, 'log');
      
      const result = await readFileModule.readFilePromise(testFilePath);
      
      expect(fs.promises.readFile).toHaveBeenCalledWith(testFilePath, expect.any(Object));
      
      expect(result).toBe(mockFileContent);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('File content (promise)'));
      
      consoleSpy.mockRestore();
    });

    test('should handle errors when reading file with promises', async () => {
      const error = new Error('File not found');
      fs.promises = { readFile: jest.fn() };
      fs.promises.readFile.mockRejectedValue(error);
      
      const consoleSpy = jest.spyOn(console, 'error');
      
      const result = await readFileModule.readFilePromise(testFilePath);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading file with promises'), error);
      
      expect(result).toBe('');
      
      consoleSpy.mockRestore();
    });
  });
});
