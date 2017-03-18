// Dynamic Password Token Library
// Version: 0.2.1 - Alpha

// Copyright 2017 @JiahaoK
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//

'use strict';

const crypto = require('crypto');

function DPT(options){
    let secretStr;

    this.options = options;
    this.generateToken = function(callback){
        getToken(secretStr,callback);
    };
    this.setKey = function(secret){
        secretStr = secret;
    };
}

let getToken = function(secret,callback){
    let HMAC = crypto.createHmac('sha256', secret.toString());
    let nextTick = calculateNextIntervalTime();
    HMAC.update(nextTick);
    callback(null, HMAC.digest('base64'));
};


function calculateNextIntervalTime(){
    let timestamp = Date.now()/100000;
    return timestamp.toFixed();
}

module.exports = DPT;
