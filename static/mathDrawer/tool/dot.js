define(["dojo/_base/declare"], function(declare){
	
	var dot = {};
	
	var RADIUS = 4;
	var COLOR_FILL = "red";
	var COLOR_STROKE = "black";
	
	dot.draw = function(surface, cx, cy){
		surface.createCircle({cx: cx, cy: cy, r: RADIUS}).setFill(COLOR_FILL).setStroke(COLOR_STROKE);
	};
	
	return dot;
});