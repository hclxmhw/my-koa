var urlurl = "http://localhost:3000";

function dateFormat(timestamp){
	var d = new Date(timestamp);
	var y = d.getFullYear();
	var m = d.getMonth()+1;
	var dd = d.getDate();
	var h = d.getHours();
	var mi = d.getMinutes();
	if(mi<10){
		mi = "0"+mi;
	}
	var s = d.getSeconds();
	if(s<10){
		s = "0"+s;
	}
	return y+"-"+m+"-"+dd+" "+h+":"+mi+":"+s;
}

function dateFormatYMD(timestamp){
	var d = new Date(timestamp);
	var y = d.getFullYear();
	var m = d.getMonth()+1;
	var dd = d.getDate();
	var h = d.getHours();
	var mi = d.getMinutes();
	if(mi<10){
		mi = "0"+mi;
	}
	var s = d.getSeconds();
	if(s<10){
		s = "0"+s;
	}
	return y+"-"+m+"-"+dd;
}