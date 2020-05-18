(function (d) {
  d.fn.resizeOnApproach = function (c) {
    var a = {
      elementDefault: 35,
      elementClosest: 55,
      triggerDistance: 200,
      setWidthAndHeight: false
    };
    c && d.extend(a, c);
    var f = a.setWidthAndHeight,
      g = this,
      e = a.elementDefault,
      h = a.triggerDistance,
      i = a.elementClosest - e,
      k = i / h,
      l = false;
    d(document).ready(function () {
      g.each(function () {
        this.style.width = e + "px";
        if (f) this.style.height = e + "px"
      })
    });
    d(document).mousemove(function (j) {
      var m = j.pageX,
        n = j.pageY;
      g.each(function (index) {
        var b = d(this).offset();
        b = distToSqEdge(this.width, b.left + this.width /
          2, b.top + this.height / 2, m, n);
        if (b < h) {
          if (b < 0) b = 0;
          l = true;

          b = e + (i - b * k);
          this.style.width = b + "px"
        //   if(j.target.className == 'icon item-5'){
        //     console.log(index + "..." + b + "px");
        //     console.log("---------");
        //    }
          this.style.transform = "translateY("+ -(b-80)/2 +"px)"
          if (f) this.style.height = b + "px"
        } else {
          this.style.width = e + "px";
          if (f) this.style.height = e + "px"
          this.style.transform = "translateY(" + 0 + "px)"
        }
      })
    })
  }
})(jQuery);

function distToSqEdge(d, c, a, f, g) {
  vx = f - c;
  vy = g - a;
  a = c = 0;
  if (vx > vy)
    if (vx > -vy) c = 1;
    else a = 1;
  else if (vx > -vy) a = -1;
  else c = -1;
  vlength = Math.sqrt(vx * vx + vy * vy);
  vux = vx / vlength;
  vuy = vy / vlength;
  cosA = vux * c + vuy * a;
  centreToSqEdge = Math.abs(0.5 * d / cosA);
  return mouseToSquareEdge = vlength - centreToSqEdge
};
