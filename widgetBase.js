//CDOT Dashboard widget
// 

(function() {
  var PopupTextWidget = this.PopupTextWidget = function() {
  
  //var self = this;
  this.textData = "Default";
  this.target;
  this.widgetDiv = document.createElement("div");
  this.widgetDiv.setAttribute("width", "100%");
  this.widgetDiv.setAttribute("height", "100%");
  this.options = {
    "style": {"cssClass": ""}
    };
  };
  
  PopupTextWidget.prototype.display = function() {
    var elem = document.getElementById(this.target);
    elem.appendChild(this.widgetDiv);
  };
  
  PopupTextWidget.prototype.update = function() {
    if (this.textData) {
      this.widgetDiv.innerHTML = this.textData;
    }

      this.widgetDiv.setAttribute("class", this.options.style.cssClass);
  };
  
  PopupTextWidget.prototype.setText = function(value) {
    if (value) {
      this.textData = value;
    }
  };
  
  PopupTextWidget.prototype.setTargetId = function(id) {
    if (id) {
      this.target = id;
    }
  };
  
  PopupTextWidget.prototype.setCssClassName = function(name) {
    if (name) {
      this.options.style.cssClass = name;
    }
  };
} ());