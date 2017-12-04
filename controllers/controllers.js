var request = require('request');
var cheerio = require('cheerio');
var patterns = require('./../patterns');

function URLGenerator(SearchInfo){
	var BaseURL = 'https://proxyspotting.in/s/?q=';
	var keywords = SearchInfo.name.split(" ");
	var q = "";
	for (var i = 0; i < keywords.length-1; i++) {
		q=q+keywords[i]+'+';
	}
	q=q+keywords[keywords.length-1];
	q=q+'+S'+SearchInfo.season+'E'+SearchInfo.episode;
	return BaseURL+q+"&page=0&orderby=99";
}

function URLGeneratorMovies(SearchInfo){
	var BaseURL = 'https://proxyspotting.in/s/?q=';
	var keywords = SearchInfo.name.split(" ");
	var q = "";
	for (var i = 0; i < keywords.length-1; i++) {
		q=q+keywords[i]+'+';
	}
	q=q+keywords[keywords.length-1];
	return BaseURL+q+"&page=0&orderby=99";
}

exports.SearchTorrent = function(req,res,next){
	console.log(req);
	var SearchInfo = {
		name:req.query.name,
		season:req.query.season,
		episode:req.query.episode,
		quality:req.query.quality
	}
	console.log(SearchInfo);
	request(URLGenerator(SearchInfo), function (error, response, body) {
		var $ = cheerio.load(body);
		var response = {
			success:0,
			SearchInfo:SearchInfo,
			results:[]
		};
		$("#SearchResults .detName > a").each(function(){
			
			var TorrentName=$(this).text();
			var match ={ 
				TorrentName:TorrentName,
				season : (TorrentName.match(patterns.season)?TorrentName.match(patterns.season)[2]:0),
				episode : (TorrentName.match(patterns.episode)?TorrentName.match(patterns.episode)[2]:0),
				quality : (TorrentName.match(patterns.quality)?TorrentName.match(patterns.quality)[1]:0),
				link : $(this).attr("href")
			}
			if (match.season == SearchInfo.season && match.episode==SearchInfo.episode && match.quality==SearchInfo.quality) {
				response.success=1;
				response.results.push(match);	
			}
		});
		res.header("Access-Control-Allow-Origin", "*");
		res.json(response);
	});
}

exports.SearchMovie = function(req,res){
	var SearchInfo = {
		name:req.query.name,
		quality:req.query.quality,
	}
	request(URLGeneratorMovies(SearchInfo), function (error, response, body) {
		var $ = cheerio.load(body);
		var response = {
			success:0,
			results:[]
		};
		$("#SearchResults .detName > a").each(function(){
			
			var TorrentName=$(this).text();
			var match ={ 
				TorrentName:TorrentName,
				quality : (TorrentName.match(patterns.quality)?TorrentName.match(patterns.quality)[1]:0),
				link : $(this).attr("href")
			}
			if ( match.quality==SearchInfo.quality) {
				response.success=1;
				response.results.push(match);	
			}
		});
		res.header("Access-Control-Allow-Origin", "*");
		res.json(response);
	});
}

exports.GetMagnetLink = function(req,res){
  request(req.query.link,function(error,response,body){
    var $ = cheerio.load(body);
    var response = {
      magnetLink:$('.download').children().first().attr('href')
    }
    res.header('Access-Control-Allow-Origin',"*");
    res.json(response);
  })
}
