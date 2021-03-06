"use strict";
/*The MIT License (MIT)

Copyright (c) 2015 Chris Borkert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
var timeago = function() {

  var o = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 1000 * 60,
    day: 24 * 60 * 1000 * 60,
    week: 7 * 24 * 60 * 1000 * 60,
    month: 30 * 24 * 60 * 1000 * 60,
    year: 365 * 24 * 60 * 1000 * 60
  };
  var obj = {};

  obj.ago = function(nd, s) {
    var r = Math.round,
        dir = ' ago',
      pl = function (v, number) {
        if (s === undefined) {
          return number + ' ' + v + (number > 1 ? 's' : '') + dir
        }
        else {
          if (v === "month") return number + "M";
          else if (v === "day") return number + "D";
          else if (v === "week") return number + "W";
          else if (v === "year") return number + "Y";
          else return number + v.substring(0, 1);
        }
      },
      ts = Date.now() - new Date(nd).getTime(),
      ii;
    if( ts < 0 )
    {
      ts *= -1;
      dir = ' from now';
    }
    for (var i in o) {
      if (r(ts) < o[i]) return pl(ii || 'm', r(ts / (o[ii] || 1)))
      ii = i;
    }
    return pl(i, r(ts / o[i]));
  }

  obj.today = function() {
    var now = new Date();
    var Weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var Month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    return Weekday[now.getDay()] + ", " + Month[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
  }

  obj.timefriendly = function(s) {
    var t = s.match(/(\d).([a-z]*?)s?$/);
    return t[1] * eval(o[t[2]]);
  }

  obj.mintoread = function(text, altcmt, wpm) {
    var m = Math.round(text.split(' ').length / (wpm || 200));
    return (m || '< 1') + (altcmt || ' min to read');
  }

  return obj;
}

if (typeof module !== 'undefined' && module.exports)
  module.exports = timeago();
