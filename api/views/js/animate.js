var aa = {};
aa.scaleIn = [0.2, 1];
aa.scaleOut = 3;
aa.durationIn = 1000;
aa.delay = 1000;

var textWrapper = document.querySelector('.slogan');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


anime.timeline({loop: false})
  .add({
    targets: '.anitext',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  })
  .add({targets:'.anitext', color:'#c3073f'},0)
  .add({
    targets: '.slogan .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 300,
    delay: (el, i) => 80 * (i+1)
  })
  
  .add({
    targets: '.homefaculty',
    opacity: [0,1],
    scale: aa.scaleIn,
    duration: aa.durationIn
  })
  .add({
    targets: '.homeadmin',
    opacity: [0,1],
    scale: aa.scaleIn,
    duration: aa.durationIn
  })
  .add({
    targets: '.homedean',
    opacity: [0,1],
    scale: aa.scaleIn,
    duration: aa.durationIn
  })
  .add({
    targets: '.helloani',
    opacity: [0,1],
    scale: aa.scaleIn,
    duration: aa.durationIn
  });
  


  
  


