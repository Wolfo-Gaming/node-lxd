function modeToString(mode)
{
  if(mode.mode) mode=mode.mode; // handle fs.stat

  var result = new Buffer('drwxrwxrwx','ascii');

  if(!(mode & 040000)) result[0]=45;

  for(var i=1, bit = 0400;bit;i++,bit >>= 1) {
    if(!(mode & bit)) result[i]=45; // ASCII for '-'
  }

  return result.toString();
}

module.exports = modeToString;

if(require.main===module) {
  var assert = require('assert');
  assert.equal('-rwxrwxrwx',modeToString(0777));
  assert.equal('----------',modeToString(0));
  assert.equal('-r-x-w-r-x',modeToString(00525));
  assert.equal('drwxrwxrwx',modeToString(040777));
  assert.equal('d---------',modeToString(040000));

  var fs = require('fs');
  var mode = fs.statSync('.');
  assert.equal('d',modeToString(mode).charAt(0));
}