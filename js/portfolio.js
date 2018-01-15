var illustration = function() {
  return [{src: 'stardust.jpg', name: 'Stardust'},
          {src: 'print3.jpg', name: 'Guardian'},
          {src: 'mikasa.png', name: 'Mikasa'},
          {src: 'brs.jpg', name: 'Black Rock Shooter'},
          {src: 'sky.jpg', name: 'Wings'},
          {src: 'azure.jpg', name: 'Azure World'},
          {src: 'mirai.jpg', name: 'Mirai Kuriyama'},
          {src: 'rakkun.jpg', name: 'Rakkun'},
          {src: 'dvapost2.jpg', name: 'D.VA'},
          {src: 'fashion1.jpg', name: 'Design 1'},
          {src: 'fashion2.jpg', name: 'Design 2'},
          {src: 'fashion3.jpg', name: 'Design 3'},
          {src: 'demon.jpg', name: 'King'},
          {src: 'friskwip.jpg', name: 'Frisk'},
          {src: '1.jpg', name: '1'},
          {src: '2.jpg', name: '2'},
          {src: '3.jpg', name: '3'},
          {src: '6.jpg', name: '4'},
          {src: '5.jpg', name: '5'},
          {src: '4.jpg', name: '6'},
          {src: 'ori.jpg', name: 'Orianna Sketch'},
          {src: 'receptacle.jpg', name: 'Receptacle'},
          {src: 'shiro.jpg', name: 'Shiro'}
          ].map(function(i) {
            return $('<div>').addClass('grid-item')
              .append($('<img>')
                .attr('src', '../images/portfolio/illustration/' + i.src))
              .append($('<div>')
                .addClass('item-cover')
                .html('<span class="align-middle">'+ i.name +'</span>')
                .data('src', '../images/portfolio/illustration/' + i.src))
          });
};


var uiux = function() {
  return [{src: 'swifte.png', name: 'Swifte Redesign'},
          {src: 'mybeeble.png', name: 'MyBeeble Redesign'},
          {src: 'hab.png', name: 'Hackers@Berkeley Website Design'},
          {src: 'hikinect.png', name: 'Hikinect'}].map(function(i) {
            return $('<div>').addClass('grid-item')
              .append($('<img>')
                .attr('src', '../images/portfolio/uiux/' + i.src))
              .append($('<div>')
                .addClass('item-cover')
                .html('<span class="align-middle">'+ i.name +'</span>')
                .data('src', '../images/portfolio/uiux/' + i.src))
          });
};

var graphicdesign = function() {
  return [{src: '2017bblogo.png', name: 'Berkeley Builds Logo'},
          {src: 'bbshirtback.png', name: 'Berkeley Builds Logo'},
          {src: 'bbshirtfront.jpg', name: 'Berkeley Builds Logo'},
          {src: 'bl+stuff.png', name: 'Berkeley Legends'},
          {src: 'opmedsk1.png', name: 'Operation Med School'},
          {src: 'opmedsk2.png', name: 'Operation Med School'},
          {src: 'opmedsk3.png', name: 'Operation Med School'},
          {src: 'wallflower.jpg', name: 'Wallflower'},
          {src: 'workshop+1-3.png', name: 'Workshops'}].map(function(i) {
           return $('<div>').addClass('grid-item')
             .append($('<img>')
               .attr('src', '../images/portfolio/graphicdesign/' + i.src))
             .append($('<div>')
              .addClass('item-cover')
              .html('<span class="align-middle">' + i.name + '</span>')
              .data('src', '../images/portfolio/graphicdesign/' + i.src))
          });
};

var codingprojects = function() {return []};

function initGrid() {
  return $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    transitionDuration: 400,
    stagger: 50
  });
}

var sizer = $('<div>').addClass('grid-sizer');

$(document).ready(function() {

  // init Masonry
  var grid = initGrid();
  var current = illustration();
  updateGrid(illustration());

  function updateGrid(stuff) {
    console.log(current);
    current.forEach(function(e) {
      grid.masonry('remove', e);
    });
    stuff.forEach(function(e) {
      grid.append(e).masonry('appended', e);
    });
    current = stuff;
    grid.masonry();
  }

  function itemCoverHandlers() {
    $('.item-cover').click(function(e) {
      $('body').addClass('no-overflow');
      $('.slide').toggle();
      $('.slide img').attr('src', $(this).data('src'));
    });
  }

  // Set up click handlers
  itemCoverHandlers();

  $('.btn-hamburger').click(function(e) {
    $(e.target).toggleClass('change');
  });

  $('#illustration').click(function(e) {
    updateGrid(illustration());
    itemCoverHandlers();
  });

  $('#uiux').click(function(e) {
    updateGrid(uiux());
    itemCoverHandlers();
  });

  $('#codingprojects').click(function(e) {
    updateGrid(codingprojects());
    itemCoverHandlers();
  });

  $('#graphicdesign').click(function(e) {
    updateGrid(graphicdesign());
    itemCoverHandlers();
  });

  $('.slide').click(function(e) {
    $('.slide').toggle();
    $('body').removeClass('no-overflow');
  });

  // // layout Masonry after each image loads
  grid.imagesLoaded().progress( function() {
    grid.masonry();
  });
});