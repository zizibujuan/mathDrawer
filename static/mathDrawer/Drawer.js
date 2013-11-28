define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-construct",
        "dojo/dom-geometry",
        "dojo/on",
        "dojox/gfx",
        "dijit/_WidgetBase",
        "mathDrawer/tool/dot",
        "mathDrawer/tool/line"], function(
        		declare,
        		lang,
        		domConstruct,
        		domGeom,
        		on,
        		gfx,
        		_WidgetBase,
        		dot,
        		line){
	
	return declare("mathDrawer.Drawer", [_WidgetBase], {
		
		_start: false,
		
		postCreate: function(){
			this.inherited(arguments);
			
			//var toolbar = domConstruct.create("div", {}, this.domNode);
			var container = this.container = domConstruct.create("div", {style: {width:"100%", height:"100%"}}, this.domNode);
			var surface = this.surface = gfx.createSurface(container, container.clientWidth, container.clientHeight);
		},
		
		startup: function(){
			this.inherited(arguments);
			
			var container = this.container;
			var surface = this.surface;
			var posSurface = domGeom.position(container);
			// 画一个实心圆
			surface.createCircle({cx:100, cy:100, r:4}).setFill("red").setStroke("black");
			on(surface, "mousedown", lang.hitch(this,function(e){
				// start
				this._start = true; // 开始绘制一个几何对象
				var x = e.pageX - posSurface.x;
				var y = e.pageY - posSurface.y
				
				this._getActiveTool().draw(surface, x, y);
				
				
			}));
			
			on(surface, "mousemove", lang.hitch(this, function(e){
				if(this._start == false) return;
				// move
				var x = e.pageX - posSurface.x;
				var y = e.pageY - posSurface.y
				this._getActiveTool().transform(surface, x, y);
			}));
			
			on(surface, "mouseup", lang.hitch(this, function(e){
				if(this._start == false) return;
				
				var x = e.pageX - posSurface.x;
				var y = e.pageY - posSurface.y
				this._getActiveTool().end(surface, x, y);
				this._start = false;
			}));
		},
		
		_getActiveTool: function(){
			//return dot;
			return line;
		}
		
	});
});