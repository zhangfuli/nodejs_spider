//先访问....../robots.txt看看什么不让动
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

//初级
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

//进阶
function selfRequest(url,callback){
	var options = {
		url : url,
		encoding:null
	}
	request(options,callback);
}
function request(url){
	selfRequest(url,function(err,res,body){
		if(!err&&res.statusCode ==200){
			//var html = iconv.decode(body,'gb2312'); //转化编码		
			body = body.toString();
			var array = body.split("},");
			fs.writeFile('./somefile.txt',url+'\n',{encoding:"utf8",flag:"a"},function(err){    
					if(!err){
						console.log('succeed');
					}else{
						throw err;
					}
				});
			for(var j=0;j<array.length;j++){
				fs.writeFile('./somefile.txt',array[j]+'\n',{encoding:"utf8",flag:"a"},function(err){    
					if(!err){
						console.log('succeed');
					}else{
						throw err;
					}
				});
			}
		}
	})
}
for(var i=1;i<=30;i++){
	var count = 1;
	count++;
	if(count == 30){

	}
	if(i<10){
		url = "http://yb.upc.edu.cn:8081/test/chengji?studentid=150702030"+i;
	}
	else{
		url = "http://yb.upc.edu.cn:8081/test/chengji?studentid=15070203"+i;
	}
	
}
