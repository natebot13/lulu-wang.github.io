var images = ['stardust.jpg',
              'print3.jpg',
              'mikasa.png',
              'brs.jpg',
              'sky.jpg',
              'azure.jpg',
              'mirai.jpg',
              'rakkun.jpg',
              'dvapost2.jpg',
              'fashion1.jpg',
              'fashion2.jpg',
              'fashion3.jpg',
              'demon.jpg',
              'friskwip.jpg',
              '1.jpg',
              '2.jpg',
              '3.jpg',
              '6.jpg',
              '5.jpg',
              '4.jpg',
              'ori.jpg',
              'receptacle.jpg',
              'sketch1.jpg',
              'shiro.jpg'
              ].map(function(i) {
                return $('<div>').addClass('grid-item')
                  .append($('<img>')
                    .attr('src', '../images/portfolioimages/' + i))
              });

var uiux = []

function clearGrid() {
  $('.grid').html($('<div>').addClass('grid-sizer'));
}

function fillGrid(things) {
  $('.grid').append(things);
}

$(document).ready(function() {
  fillGrid(images);
  $('#uiux').click(function(e) {
    clearGrid();
  });
  // init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    transitionDuration: 1000,
    stagger: 50
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });
});