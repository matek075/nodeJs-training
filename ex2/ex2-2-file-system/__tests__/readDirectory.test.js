const fs = require('fs');
const path = require('path');

jest.mock('fs');

const readDirectoryModule = require('../readDirectory');

describe('Directory Reading Tests', () => {
    // Sample directory content for mocking
    const mockFiles = ['file1.txt', 'file2.js', 'file3.json'];
    const testDir = './test-directory';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Synchronous Directory Reading', () => {
        test('should read directory synchronously', () => {
            fs.readdirSync.mockReturnValue(mockFiles);

            const consoleSpy = jest.spyOn(console, 'log');

            readDirectoryModule.readDirSync(testDir);

            expect(fs.readdirSync).toHaveBeenCalledWith(testDir);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Files in directory'));

            consoleSpy.mockRestore();
        });

        test('should handle errors when reading directory synchronously', () => {
            const error = new Error('Directory not found');
            fs.readdirSync.mockImplementation(() => {
                throw error;
            });

            const consoleSpy = jest.spyOn(console, 'error');

            readDirectoryModule.readDirSync(testDir);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading directory'), error);

            consoleSpy.mockRestore();
        });
    });

    describe('Asynchronous Directory Reading with Callback', () => {
        test('should read directory asynchronously with callback', (done) => {
            fs.readdir.mockImplementation((path, callback) => {
                callback(null, mockFiles);
            });

            const consoleSpy = jest.spyOn(console, 'log');

            readDirectoryModule.readDirCallback(testDir, () => {
                expect(fs.readdir).toHaveBeenCalledWith(testDir, expect.any(Function));

                expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Files in directory'));

                consoleSpy.mockRestore();
                done();
            });
        });

        test('should handle errors when reading directory asynchronously with callback', (done) => {
            // Mock fs.readdir to return an error
            const error = new Error('Directory not found');
            fs.readdir.mockImplementation((path, callback) => {
                callback(error, null);
            });

            const consoleSpy = jest.spyOn(console, 'error');

            readDirectoryModule.readDirCallback(testDir, () => {
                expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading directory'), error);

                consoleSpy.mockRestore();
                done();
            });
        });
    });

    describe('Directory Reading with Promises', () => {
        test('should read directory using promises', async () => {
            fs.promises = { readdir: jest.fn() };
            fs.promises.readdir.mockResolvedValue(mockFiles);

            const consoleSpy = jest.spyOn(console, 'log');

            await readDirectoryModule.readDirPromise(testDir);

            expect(fs.promises.readdir).toHaveBeenCalledWith(testDir);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Files in directory'));

            consoleSpy.mockRestore();
        });

        test('should handle errors when reading directory with promises', async () => {
            const error = new Error('Directory not found');
            fs.promises = { readdir: jest.fn() };
            fs.promises.readdir.mockRejectedValue(error);

            const consoleSpy = jest.spyOn(console, 'error');

            await readDirectoryModule.readDirPromise(testDir);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading directory'), error);

            consoleSpy.mockRestore();
        });
    });
});
