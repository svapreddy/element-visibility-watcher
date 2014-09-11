var msg = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique."; 


var dummyData = [];
for(var i = 100; i--; dummyData.push(msg.substring(0, ~~(Math.random() * 1e3))));

var ractive = new Ractive({
	el: '#body',
	template: "#scroller",
	data: {
		list: dummyData
	}
});

ractive.on('visible', function(event, index) {
	var ev = event.original, isVisible = ev.visible, prev = ev.previous, cur = ev.current, str = [index, " is "];
	if(cur === true && !prev){
		str.push('visible');
		console.log(str.join(''));
	}
	if(cur == false && prev === true){
		str.push('invisible');
		console.log(str.join(''));
	}
});