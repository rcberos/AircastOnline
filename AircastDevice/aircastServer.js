var request = require('request');
var http = require('http');
var fs = require('fs');
var async = require('async');
var path = require('path');
var df = require('download-file')
var needle = require('needle')

var RpiConfig = {
	RpiID: 0,
	RpiServer: "",
	CheckFile: "",
	UpdateFile: "",
	RpiDownloading: [],
	isLegit: false,
	mayDownload: false,
	RpiTempDownloading: []
}


var configLocation = path.join(__dirname, '../AircastConfig/config.json');

var getConfig = function(){
	var AircastConfig = require(configLocation);


	RpiConfig.RpiID = AircastConfig.RpiID;
	RpiConfig.RpiServer = AircastConfig.RpiServer;
	RpiConfig.CheckFile = AircastConfig.CheckFile;
	RpiConfig.UpdateFile = AircastConfig.UpdateFile;
	RpiConfig.Timeout = AircastConfig.Timeout;

	if(RpiConfig.RpiID != 0){
		RpiConfig.isLegit = true;
		return true;
	}
	else
		return false;
}

function update(CampaignID){
	var options = {
	  uri: RpiConfig.RpiServer+RpiConfig.UpdateFile,
	  method: 'POST',
	  json: {
	    RpiID: RpiConfig.RpiID,
	    CampaignID: CampaignID
	  }
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log('CampaignID: '+CampaignID+' UPDATED');
	  	RpiConfig.RpiDownloading.forEach(function(d, index){
	  		if(d.CampaignID == CampaignID){
	  			RpiConfig.RpiDownloading.splice(index, 1);
	  		}
	  	});
	  	// console.log(RpiConfig.RpiDownloading);
	  }
	});
}

function download(CampaignID, CampaignFile, cb){
	console.log('Downloading CampaignID: '+CampaignID+' FileID: '+CampaignFile.FileID);

	var dest = path.join(__dirname+'/Aircast/'+CampaignFile.FileName);
	var source = 'http://s3-ap-southeast-1.amazonaws.com/rpitv/Aircast/'+CampaignFile.FileName;

	var options = {
	    directory: path.join(__dirname+'/Aircast/'),
	    filename: CampaignFile.FileName,
	    timeout: 20000
	}
	 
	df(source, options, function(err){
	    // if (err) throw err
	    if(err){
	    	console.log(err);
	    	return cb('error');
	    }
	    else{
	    	console.log("meow")
			console.log('File Downloaded: '+CampaignFile.FileID);
			return cb();
	    }
		    
	}) 
	
}


var getRpiFiles = function(){
	var opt = {
	   headers: { 'Content-Type': 'application/json' }
	  }
	var data = {
	    RpiID: RpiConfig.RpiID
	  }

	  // download();

	var options = {
	  uri: RpiConfig.RpiServer+RpiConfig.CheckFile,
	  method: 'POST',
	  json: {
	    RpiID: RpiConfig.RpiID
	  }
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// console.log(JSON.stringify(body));
	  	console.log('get files success');
		var data = body.value;
		for(var i = 0; i < data.length; i++){
			var isDownloading = false;
			for(var j = 0; j < RpiConfig.RpiDownloading.length; j++){
				if(data[i].CampaignID == RpiConfig.RpiDownloading[j].CampaignID){
					isDownloading = true;
					break;
				}
			}
			if(isDownloading == false){
				var campaign = {
					isDownloading: false,
					CampaignID: data[i].CampaignID,
					Files: data[i].Files
				}
				RpiConfig.RpiDownloading.push(campaign);
			}
			console.log(JSON.stringify(RpiConfig.RpiDownloading));
		}


		RpiConfig.RpiDownloading.forEach(function(d, index){
			if(d.isDownloading == false){
				// console.log('New File to Download: '+d.CampaignID);
				d.isDownloading = true;
				async.each(d.Files, function(file, callback) {
					// console.log(index);
					download(d.CampaignID, file, callback);
				}, function(err){
					// console.log(err);
					if(!err){
						console.log('CampaignID: '+d.CampaignID+' FULL DOWNLOADED');
						update(d.CampaignID);

					}
					else{
						console.log('FileFailed');
						d.isDownloading = false;

					}
				})
			}

		})
	  }
	  else{
	  	console.log('connection failed');
	  	// console.log(error);
	  }
	});
}


function downloadTemplate(ARTID, file, cb){
	console.log('Downloading ARTID: '+ARTID+' FileID: '+file.FileName);

	var dest = path.join(__dirname+'/'+file.NodeLocation+'/');
	var source = 'http://s3-ap-southeast-1.amazonaws.com/rpitv/'+file.S3Location+'/'+file.S3FileName;

	// console.log(source);
	// console.log(dest);

	var options = {
	    directory: dest,
	    filename: file.FileName,
	    timeout: 20000
	}
	 
	df(source, options, function(err){
	    // if (err) throw err
	    if(err){
	    	console.log(err);
	    	return cb('error');
	    }
	    else{
	    	console.log("meow")
			console.log('File Downloaded: '+file.FileName);
			return cb();
	    }
		    
	}) 
	
}

function updateTemplate(ARTID){
	var options = {
	  uri: RpiConfig.RpiServer+'rpiUpdateTemplateFiles',
	  method: 'POST',
	  json: {
	    ARTID: ARTID
	  }
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// console.log(body);
	  	console.log('ARTID: '+ARTID+' UPDATED');
	  	RpiConfig.RpiTempDownloading.forEach(function(d, index){
	  		if(d.ARTID == ARTID){
	  			RpiConfig.RpiTempDownloading.splice(index, 1);
	  		}
	  	});
	  	// console.log(RpiConfig.RpiDownloading);
	  }
	});
}


var getSourceFileUpdates = function(){
	var opt = {
	   headers: { 'Content-Type': 'application/json' }
	  }
	var data = {
	    RpiID: RpiConfig.RpiID
	  }

	needle.post(RpiConfig.RpiServer+'rpiCheckTempFile', data, opt, function(err, resp) {
		if(!err){
			console.log('rpiCheckTempFile Success');
			// console.log(resp.body.value[0].Files);

			var data = resp.body.value;
			for(var i = 0; i < data.length; i++){
				// console.log(data);
				var isDownloading = false;
				for(var j = 0; j < RpiConfig.RpiTempDownloading.length; j++){
					if(data[i].ARTID == RpiConfig.RpiTempDownloading[j].ARTID){
						isDownloading = true;
						break;
					}
				}
				if(isDownloading == false){
					var template = {
						isDownloading: false,
						ARTID: data[i].ARTID,
						Files: data[i].Files
					}
					RpiConfig.RpiTempDownloading.push(template);
				}
				// console.log(JSON.stringify(RpiConfig.RpiTempDownloading));
			}


			RpiConfig.RpiTempDownloading.forEach(function(d, index){
				if(d.isDownloading == false){
					d.isDownloading = true;
					async.each(d.Files, function(file, callback) {
						downloadTemplate(d.ARTID, file, callback);
					}, function(err){
						// console.log(err);
						if(!err){
							console.log('ART: '+d.ARTID+' FULL DOWNLOADED');
							updateTemplate(d.ARTID);

						}
						else{
							console.log('FileFailed');
							d.isDownloading = false;

						}
					})
				}

			})

		}
		else{
			console.log('rpiCheckTempFile Error');
		}
	});

}



var nodeAlive = function(){
	var opt = {
	   headers: { 'Content-Type': 'application/json' }
	  }
	var data = {
	    RpiID: RpiConfig.RpiID
	  }

	needle.post(RpiConfig.RpiServer+'rpiLastNodeAlive', data, opt, function(err, resp) {
		console.log('done');
	})
}


var removeFile = function(){
	var opt = {
	   headers: { 'Content-Type': 'application/json' }
	  }
	var data = {
	    RpiID: RpiConfig.RpiID
	  }

	needle.post(RpiConfig.RpiServer+'rpiCheckRemoveFile', data, opt, function(err, resp) {
		if(!err){
			// console.log(resp.body);
			var data = resp.body.value;

			data.forEach(function(d){
				console.log(d.NodeLocation);
				var dest = path.join(__dirname+'/'+d.NodeLocation+'/'+d.FileName);
				// console.log(dest);
				fs.unlink(dest, function(err) {
				    if(err && err.code == 'ENOENT') {
				        // file doens't exist
				        console.info("File doesn't exist, won't remove it.");

				        var opt = {
						   headers: { 'Content-Type': 'application/json' }
						  }
						var data = {
						    RpiID: RpiConfig.RpiID,
						    ARRFID: d.ARRFID
						  }

						needle.post(RpiConfig.RpiServer+'rpiUpdateRemoveFile', data, opt, function(err, resp) {
							if(!err){
								console.log('ARRFID: '+d.ARRFID+' removed')
							}
						})

				    } else if (err) {
				        // other errors, e.g. maybe we don't have enough permission
				        console.error("Error occurred while trying to remove file");
				    } else {
				        
				    	var opt = {
						   headers: { 'Content-Type': 'application/json' }
						  }
						var data = {
						    RpiID: RpiConfig.RpiID,
						    ARRFID: d.ARRFID
						  }

						needle.post(RpiConfig.RpiServer+'rpiUpdateRemoveFile', data, opt, function(err, resp) {
							if(!err){
								console.log('ARRFID: '+d.ARRFID+' removed')
							}
						})

				    }
				});
			})
		}
	})
}




module.exports = {
	config: RpiConfig,
	getConfig: getConfig,
	getRpiFiles: getRpiFiles,
	getSourceFileUpdates: getSourceFileUpdates,
	nodeAlive: nodeAlive,
	removeFile: removeFile
};