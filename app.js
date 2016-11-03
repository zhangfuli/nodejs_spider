//先访问....../robots.txt看看什么不让动
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
function capture(){
	//发送请求抓取的页面
	request('http://read.qidian.com/BookReader/2OZih9MNQLg1,u0JcxacWQo4ex0RJOkJclQ2.aspx', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(body);
	    $ = cheerio.load(body);//把返回的body转化$,$为前端选择器
	    // var data=$(".txtwrap p").text();
	//  var str = iconv.decode(data, 'GBK'); //return unicode string from GBK encoded bytes
	   fs.writeFile('./somefile.txt',body,function(err){     //writeFile  也可以创建一个文件  可指定位置
			if(!err){
				console.log('succeed');
			}else{
				throw err;
			}
		});
		// console.log(data);
	  }
	})
}
capture();
