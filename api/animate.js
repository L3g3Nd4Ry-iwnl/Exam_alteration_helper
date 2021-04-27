anime.timeline({loop: false})
  .add({
    targets: '.anitext',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  })
  .add({targets:'.animation', margin:0},0)
 // .add({
 //   targets: '.anitext',
 //  translateY: -250,
 //   easing: 'easeInOutSine'
 // })
  .add({targets:'.anitext', color:'#c3073f'},0)
  
