var path = require('path');
var fs   = require('fs');
var glob = require('glob');
 
if (process.argv.length <= 2) {
    console.log("Usage: search [EXT] [TEXT]");
    process.exit(-1);
}
 
var args = process.argv.slice(2);
var fileExtension =  args[0];
var tokenToSearch =  args[1];
var currentPath = __dirname;
 var currentFile = ''
 
 fileExtension = fileExtension.startsWith('.') ? fileExtension : '.' +fileExtension;
 
 var getDirectories = function (src, callback) {
 glob(src + '/**/*', callback);
};


//invocation
getDirectories(currentPath, function (err, res) {
	var foundflag = false;
  if (err) {
    console.log('Error', err);
  } else {
	  var i;
	  for(i=0; i<res.length; i++)
	  {    
		foundflag = false;
		
		if(path.extname(res[i]) == fileExtension)
		{			
	
			currentFile = res[i];
			fs.readFile(res[i],function (err, data) {
            if (err) {
				foundflag = false;
				//throw err;
				console.log(err.message);
				}
								
				
            if (data.indexOf(tokenToSearch) >= 0) {
                console.log(currentFile);
				foundflag = true;				
            }
			
		});
						
		}
	  }
  }
  
  if(foundflag == false)
	  console.log('No file found');   	
	        
});
