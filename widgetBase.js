//CDOT Dashboard widget
// 

(function() {
  var WidgetBase = this.WidgetBase = function() {
  
  var self = this;
  this.textData = "Default";
  this.target;
  this.dataInfo = { 
    "callback": null, 
    "interval": 0 
  }
  this.intvl;
  this.widgetDiv = document.createElement("div");
  this.widgetDiv.setAttribute("width", "100%");
  this.widgetDiv.setAttribute("height", "100%");
  this.options = {
    "style": {"cssClass": ""}
    };
  };
  
  WidgetBase.prototype.update = function() {
    
    var data = this.dataInfo.callback();
    setText(data);
    
  };
  
  WidgetBase.prototype.display = function() {
    var elem = document.getElementById(this.target);
    elem.appendChild(this.widgetDiv);
  };
  
  WidgetBase.prototype.start = function() {
    this.intvl = setInterval(this.update, this.dataInfo.interval);
  };
  
  WidgetBase.prototype.stop = function() {
    clearInterval(this.intvl);
  };
  
  WidgetBase.prototype.setText = function(value) {
    if (value) {
      this.textData = value;
      this.widgetDiv.innerHTML = value;
    }
  };
  
  WidgetBase.prototype.setTargetId = function(id) {
    if (id) {
      this.target = id;
    }
  };
  
  WidgetBase.prototype.setCssClassName = function(name) {
    if (name) {
      this.options.style.cssClass = name;
    }
    this.widgetDiv.setAttribute("class", this.options.style.cssClass);
  };
  
  WidgetBase.prototype.setDataCallback = function(callback, intervalTime) {
    if (callback && intervalTime) {
      this.dataInfo.callback = callback;
      if (!isNaN(intervalTime) && intervalTime > 0) {
        this.dataInfo.interval = intervalTime;
      } else {
        this.dataInfo.interval = 50000;
      }
    }
  };
} ());