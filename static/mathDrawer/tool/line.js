define(["dojo/_base/declare"], function(declare){
	
	var line = {};
	
	var RADIUS = 4;
	var COLOR_FILL = "red";
	var COLOR_STROKE = "black";
	
	var LINE_COLOR_STROKE = "blue";
	var LINE_WIDTH = 3;
	
	var point = {};
	var _line = null;
	
	line.draw = function(surface, x, y){
		point.x1 = x;
		point.y1 = y;
		// 线的起点
		surface.createCircle({cx: x, cy: y, r: RADIUS}).setFill(COLOR_FILL).setStroke(COLOR_STROKE);
	};
	
	line.transform = function(surface, x, y){
		if(_line){
			surface.remove(_line); // 还没有彻底删除
			_line.destroy();
		}
		
		point.x2 = x;
		point.y2 = y;
		_line = surface.createLine(point).setStroke({color: LINE_COLOR_STROKE, width: LINE_WIDTH});
	},
	
	line.end = function(surface, x, y){
		point.x2 = x;
		point.y2 = y;
		_line = surface.createLine(point).setStroke({color: LINE_COLOR_STROKE, width: LINE_WIDTH});
	}
	
	return line;
});