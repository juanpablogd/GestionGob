
var Func={
	Decrypted : function (message) {
		try {
			var text=CryptoJS.AES.decrypt(message,Config.cl).toString(CryptoJS.enc.Utf8)
		}
		catch(err) {
		    this.CerrarAPP();
			return false;
		}
		if(text==''){
			this.CerrarAPP();
			return false;
		}else{
			var decrypted =JSON.parse(CryptoJS.AES.decrypt(message,Config.cl).toString(CryptoJS.enc.Utf8));
			return decrypted;	
		}
	},
	Ecrypted: function (json){
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(json), Config.cl);
		return ciphertext.toString();
	},
	
	degToRad:function(deg) {
       return deg * Math.PI * 2 / 360;
   },
   	sorting:function(json_object, key_to_sort_by) {
	    function sortByKey(a, b) {
	        var x = a[key_to_sort_by];
	        var y = b[key_to_sort_by];
	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    }

	    json_object.sort(sortByKey);
	},
	uniques(arr) {
	    var a = [];
	    for (var i=0, l=arr.length; i<l; i++)
	        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
	            a.push(arr[i]);
	    return a;
	}, 
	flyTo(location, done) {
        var duration = 2000;
        var zoom = AppMap.view.getZoom();
        var parts = 2;
        var called = false;
        function callback(complete) {
          --parts;
          if (called) {
            return;
          }
          if (parts === 0 || !complete) {
            called = true;
            done(complete);
          }
        }
        AppMap.view.animate({
          center: location,
          duration: duration
        }, callback);
        AppMap.view.animate({
          zoom: 8,
          duration: duration / 2
        }, {
          zoom: 11,
          duration: duration / 2
        }, callback);
      }

}

