import * as memeService from '../../src/services/memeService.js';
import * as memeRepository from '../../src/repository/memeRepository.js';
import * as userRepository from '../../src/repository/userRepository.js';

jest.mock('bad-words');

describe('listMemes', () => {
  it('Should return "No memes today!" and an empty array when the limit is -1', async () => {
    const result = await memeService.listMemes(-1);

    expect(result.message).toEqual('No memes today!');
    expect(result.data).toEqual([]);
  });

  it('Should return "No memes today!" and an empty array when the limit is 0', async () => {
    const result = await memeService.listMemes(0);

    expect(result.message).toEqual('No memes today!');
    expect(result.data).toEqual([]);
  });

  it('Should return "List all memes" and a meme array when the limit is 1', async () => {
    jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => []);

    const result = await memeService.listMemes();

    expect(result.message).toEqual('No memes today!');
    expect(result.data).toEqual([]);
  });

  it('Should return "List all memes" and a meme array when the limit is 1', async () => {
    jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => []);

    const result = await memeService.listMemes(1);

    expect(result.message).toEqual('No memes today!');
    expect(result.data).toEqual([]);
  });

  it('Should return "List all memes" and a meme array when the limit is 1', async () => {
    jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => ['meme']);

    const result = await memeService.listMemes();

    expect(result.message).toEqual('List all memes');
    expect(result.data).toEqual(['meme']);
  });

  it('Should return "List all memes" and a meme array when the limit is 1', async () => {
    jest.spyOn(memeRepository, 'listMemes').mockImplementationOnce(() => ['meme']);

    const result = await memeService.listMemes(1);

    expect(result.message).toEqual('List all memes');
    expect(result.data).toEqual(['meme']);
  });
});

describe('insertMeme', () => {
  it('Should return no user if token is invalid', async () => {
    jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => []);

    const result = await memeService.insertMeme('token', 'url', 'text');

    expect(result.message).toEqual('No user!');
    expect(result.data).toEqual([]);
  });

  it('Should return "New meme indahouse" and a meme array when all parameters are valid', async () => {
    jest.spyOn(userRepository, 'findUserByTokenSession').mockImplementationOnce(() => ['an user']);
    jest.spyOn(memeRepository, 'insertMeme').mockImplementationOnce(() => ['meme!']);

    const result = await memeService.insertMeme('token', 'url', 'text');

    expect(result.message).toEqual('New meme indahouse');
    expect(result.data).toEqual(['meme!']);
  });
});
