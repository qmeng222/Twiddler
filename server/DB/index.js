var DBPath = './DB/data/';
var Path = require('path');
const { promises: Fs } = require('fs')
var read = require('./DBFuncs/readDBFunc').modInit(Fs, Path, DBPath);
var write = require('./DBFuncs/writeDBFunc').modInit(Fs, Path, DBPath);
var checkDBForFile = require('./DBFuncs/checkDBforFile').modInit(Fs, Path, DBPath);
var check = {
  "forFile":checkDBForFile
};

module.exports = {
  read,
  write,
  check
}