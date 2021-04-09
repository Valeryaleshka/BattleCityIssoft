resizeWindowSize();
window.addEventListener("resize", resizeWindowSize);

function resizeWindowSize() {
  const body = document.getElementById("body");
  const main = document.getElementById("main");
  const windowHight = body.offsetHeight;
  const windowWwidth = body.offsetWidth;
  
  if (windowWwidth * 0.75 > windowHight) {
    main.style.width = ( windowHight * 4) / 3 + "px";
    main.style.height =  windowHight + "px";
  } else {
    main.style.width =  windowWwidth  + "px";
    main.style.height = windowWwidth * 0.75 + "px";
  }
}
