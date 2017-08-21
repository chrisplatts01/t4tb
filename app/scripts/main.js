jQuery.noConflict();


(function($) {
    // -------------------------------------------------------------------------
    // Custom validation methods
    // -------------------------------------------------------------------------
    // $.validator.addMethod("mincheck", function(value, element, params) {
    //   var name = $(element).attr('name');
    //   var selector = '[name="' + name + '"]:checked';
    //   var elementsChecked = $(selector).length;

    //   return elementsChecked >= params;
    // }, "At least {0} boxes must be checked");

    // $.validator.addMethod("maxcheck", function(value, element, params) {
    //   var name = $(element).attr('name');
    //   var selector = '[name="' + name + '"]:checked';
    //   var elementsChecked = $(selector).length;

    //   return elementsChecked <= params;
    // }, "At least {0} boxes must be checked");

    // -------------------------------------------------------------------------
    // Handle form validation - submit button disabled until all fields valid
    // -------------------------------------------------------------------------
    var checkIfValid = function() {
      var $t4tbForm = $('#t4tb');
      var $submitButton;
      var isValid = true;

      if ($t4tbForm.length) {
        $submitButton = $t4tbForm.find('.button--next');
        isValid = $t4tbForm.valid();

        if (isValid) {
          $submitButton.removeClass('disabled');
        } else {
          $submitButton.addClass('disabled');
        }
      }
    };

    var validator = $('#t4tb').validate({
      errorPlacement: function(error, element) {
        error.appendTo(element.parent('.form-field'));
      },
      errorElement: 'div',
      onfocusout: function(el, ev) {
        checkIfValid();
      },
      onkeyup: function(el, ev) {
        checkIfValid();
      },
      onclick: function(el, ev) {
        checkIfValid();
      },
      onsubmit: function(el, ev) {
        checkIfValid();
        form.submit();
      },
      rules: {},
    });
    checkIfValid();

  // ---------------------------------------------------------------------------
  // Handle sticky footer
  // ---------------------------------------------------------------------------
  var resizeTimer;

  $(window).bind('load', function() {
    /**
     * Set sticky footer status
     */
    function stickyFooter() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        var $sectionFooter = $('#page-content').find('footer');
        var $pageFooter = $('#page-footer');

        if ($(window).height() < $(document).height()) {
          $pageFooter.css({'position': 'static', 'width': 'auto', 'bottom': 'auto'});
          $sectionFooter.css({'position': 'relative', 'width': 'auto', 'bottom': 'auto'});
          $('#page-content').css({'padding-bottom': '0'});
        } else {
          $pageFooter.css({'position': 'fixed', 'width': '100%', 'bottom': '0'});
          $sectionFooter.css({'position': 'fixed', 'width': '100%', 'bottom': $pageFooter.outerHeight() + 'px'});
          $('#page-content').css({'padding-bottom': $pageFooter.outerHeight() + $sectionFooter.outerHeight() + 'px'});
        }
      }, 250);
    }

    stickyFooter();
    $(window).on('resize', stickyFooter);
  });

  // ---------------------------------------------------------------------------
  // Handle JQuery UI Slider as numeric value
  // ---------------------------------------------------------------------------
  $('.slider').slider({
    create: function(event, ui) {
      var $this = $(this);
      var $input = $this.find('input');
      var min = $input.data('min');
      var max = $input.data('max');
      var step = $input.data('step');

      $this.slider('option', 'min', min);
      $this.slider('option', 'max', max);
      $this.slider('option', 'step', step);
      $this.slider('option', 'range', false);
      $this.slider('option', 'animate', 500);
    },
    slide: function(event, ui) {
      var $this = $(this);
      var $input = $this.find('input');
      var $fill = $this.find('.slider_fill');

      var min = $this.slider('option', 'min');
      var max = $this.slider('option', 'max');
      var value = ui.value;
      var fill = (value / (max - min) * 100) + '%';

      $input.val(value);
      $fill.width(fill);

      // Force form validation
      checkIfValid();
    },
  });

  // ---------------------------------------------------------------------------
  // Handle JQuery UI Slider as option list
  // ---------------------------------------------------------------------------
  var $slider = $('.slider-1').slider({
    create: function(event, ui) {
      var $this = $(this);
      var $select = $this.find('select');

      var values = $select.data('values').split('|');
      var max = values.length - 1;

      var width = 100 / (max + 1) + '%';
      var margin = -0.5 * 100 / (max + 1) + '%';

      $this.slider('option', 'min', 0);
      $this.slider('option', 'max', max);
      $this.slider('option', 'step', 1);
      $this.slider('option', 'value', parseInt(max / 2));
      $this.slider('option', 'range', false);
      $this.slider('option', 'animate', 500);

      $this
        .find('.slider-1_values')
        .css({marginLeft: margin, marginRight: margin});
      $this
        .find('.slider-1_value')
        .width(width);
    },
    slide: function(event, ui) {
      var $this = $(this);
      var $select = $this.find('select');

      var max = $this.slider('option', 'max');
      var value = ui.value;
      var values = $select.data('values').split('|');
      var fill = (value / max * 100) + '%';

      $select.selectedIndex = value;
      $select.val(values[value]);
      $this.find('.slider-1_fill').width(fill);

      // Force form validation
      checkIfValid();
    },
  });

  $('.slider-1').find('select')
    .on('change', function() {
      $slider.slider('value', this.selectedIndex);
    });

  // ---------------------------------------------------------------------------
  // Handle JQuery UI date widget
  // ---------------------------------------------------------------------------
  $('input[data-type=date]').datepicker({
    maxDate: 0,
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    yearRange: '1900:+0',
    prevText: '<<',
    nextText: '>>',

    // Force validation when datepicker date is selected
    onSelect: function(date) {
      console.log('This is: ' + $(this).attr('name'));
      $(this).change();
      $(this).attr('placeholder', '');

      // Force form validation
      checkIfValid();
   },
  });


  // ---------------------------------------------------------------------------
  // Handle user-status overlay display
  // ---------------------------------------------------------------------------
  $('#page-header')
    .find('.user-info_name, .user-info_profile')
    .on( 'click', function() {
      $('#user-status').show();
    });

  $('#user-status')
    .find('.user-status_close')
    .on( 'click', function() {
      $('#user-status').hide();
    });

  // ---------------------------------------------------------------------------
  // Handle modals
  // ---------------------------------------------------------------------------
  $('.modal').popup({
    color: '#022553',
    opacity: 0.9,
    horizontal: 'center',
    vertical: 'center',
    escape: true,
    blur: false,
  });

  // Show/hide individual modals
  // These need to be replaced by a generic click event if possible
  $('.popup-wrapper').hide();
  // ---------------------------------------------------------------------------
  $('#my-data-open')
    .on('click', function() {
      $('#my-data').popup('show');
    });
  $('#my-data-close')
    .on('click', function() {
      $('#my-data').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#why-important-open')
    .on('click', function() {
      $('#why-important').popup('show');
    });
  $('#why-important-close')
    .on('click', function() {
      $('#why-important').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#what-is-dementia-open')
    .on('click', function() {
      $('#what-is-dementia').popup('show');
    });
  $('#what-is-dementia-close')
    .on('click', function() {
      $('#what-is-dementia').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#why-exercise-open')
    .on('click', function() {
      $('#why-exercise').popup('show');
    });
  $('#why-exercise-close')
    .on('click', function() {
      $('#why-exercise').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#ill-health-open')
    .on('click', function() {
      $('#ill-health').popup('show');
    });
  $('#ill-health-close')
    .on('click', function() {
      $('#ill-health').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#ipaq-open')
    .on('click', function() {
      $('#ipaq').popup('show');
    });
  $('#ipaq-close')
    .on('click', function() {
      $('#ipaq').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#exit-home-open')
    .on('click', function() {
      $('#exit-home').popup('show');
    });
  $('#exit-home-close, #exit-home-close-button')
    .on('click', function() {
      $('#exit-home').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#exit-measures-open')
    .on('click', function() {
      $('#exit-measures').popup('show');
    });
  $('#exit-measures-close, #exit-measures-close-button')
    .on('click', function() {
      $('#exit-measures').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#exit-dashboard-open')
    .on('click', function() {
      $('#exit-dashboard').popup('show');
    });
  $('#exit-dashboard-close, #exit-dashboard-close-button')
    .on('click', function() {
      $('#exit-dashboard').popup('hide');
    });
  // ---------------------------------------------------------------------------
  $('#contact-form-open')
    .on('click', function() {
      $('#contact-form').popup('show');
    });
  $('#contact-form-close, #exit-dashboard-close-button')
    .on('click', function() {
      $('#contact-form').popup('hide');
    });

  // ---------------------------------------------------------------------------
  // Handle psotcode lookup results - assumes last 2 array elements are town
  // and postcode and there are no more than 3 other address fields.
  // ---------------------------------------------------------------------------
  $('#t4tb').find('#address-list').on('change', function() {
    var address = $(this).val().split(',');

    $('#t4tb').find('input[type=text]').val('');
    for (var i = 0; i <= Math.min(address.length-3, 2); i++) {
      $('#t4tb').find('#address-' + (i+1)).val(address[i]);
    }
    $('#t4tb').find('#town').val(address[address.length-2]);
    $('#t4tb').find('#postcode').val(address[address.length-1]);
  });

  // -------------------------------------------------------------------------
  // Initialise timer icons
  // -------------------------------------------------------------------------
  var initTimerIcons = function(selector) {
    var icons = selector || '.timer-icon';

    $(icons).each(function(i) {
      $(this).attr('id', 'timer-icon-' + i);
    });
  };

  // -------------------------------------------------------------------------
  // Draw timer icons
  // -------------------------------------------------------------------------
  var drawTimerIcons = function(selector) {
    var icons = selector || '.timer-icon';

    $(icons).each(function() {
      var stageID = $(this).attr('id');
      var minutes = $(this).attr('data-duration') || 0;
      var stage = acgraph.create(stageID);
      var color = $(this).attr('data-color') || '#ccc1ba';
      var strokeWidth = 2;

      console.log('Minutes = ' + minutes + ', Color = ' + color);

      var cr = 15;
      var cx = 18;
      var cy = 18;

      var pr = 11.5;
      var pa = minutes * 6;
      var px = cx;
      var py = cy;

      stage.circle(cx, cy, cr).stroke({color: color, thickness: strokeWidth});
      stage.path().moveTo(px, py).lineTo(px, py - pr).arcTo(pr, pr, 270, pa).lineTo(px, py).close().stroke({color: color, thickness: 1}).fill(color);
    });
  };

  // -------------------------------------------------------------------------
  // Calculate total session times
  // -------------------------------------------------------------------------
  var sessionTotal = function() {
    var total = 0;

    $('#session-select').find('input:checked').each(function() {
      total = total + parseInt($(this).parent('.form-field').find('.timer-icon').attr('data-duration'));
    });

    return total;
  };

  // -------------------------------------------------------------------------
  // Calculate initial session total and call fn to init/draw timer icons
  // -------------------------------------------------------------------------
  var $sessionTotal = $('#session-total');
  var id = $sessionTotal.find('.timer-icon').attr('id');
  var total = sessionTotal();
  initTimerIcons('.timer-icon');
  $sessionTotal.html(total +' mins <span id="' + id + '" class="timer-icon" data-duration="' + total + '" data-color=' + '"#1aab98"></span>');
  drawTimerIcons('.timer-icon');

  // -------------------------------------------------------------------------
  // Update icons and session total on change
  // -------------------------------------------------------------------------
  $('#session-select').find('input[type=checkbox]').on('change', function() {
    var $this = $(this);
    var $timer = $(this).parent('.form-field').find('.timer-icon');
    var $circle = $timer.find('circle');
    var $path = $timer.find('path');
    var $sessionTotal = $('#session-total');
    var id = $sessionTotal.find('.timer-icon').attr('id');
    var total;

    if ($this.prop('checked')) {
      $circle.attr('stroke', '#1aab98');
      $path.attr('stroke', '#1aab98').attr('fill', '#1aab98');
    } else {
      $circle.attr('stroke', '#ccc2ba');
      $path.attr('stroke', '#ccc2ba').attr('fill', '#ccc2ba');
    }

    total = sessionTotal();
    $sessionTotal.html(total +' mins <span id="' + id + '" class="timer-icon" data-duration="' + total + '" data-color=' + '"#1aab98"></span>');
    drawTimerIcons('#session-total .timer-icon');
  });

  // -------------------------------------------------------------------------
  // Handle responsive video
  // -------------------------------------------------------------------------
  var $videoFrames = $('#video-frame');

  $videoFrames.each(function(i) {
    var $videoFrame = $(this);
    var url = $videoFrame.attr('src');
    var players = /www.youtube.com|player.vimeo.com/;
    var videoRatio;

    if (url.search(players) > 0) {
      videoRatio = ($videoFrame.attr('height') / $videoFrame.attr('width')) * 100;

      $videoFrame
        .css({
          'position': 'absolute',
          'top': '0',
          'left': '0',
        })
        .attr('width', '100%')
        .attr('height', '100%');

      $videoFrame
        .parent('.video-wrapper')
        .css({
          'width': '100%',
          'position': 'relative',
          'padding-top': videoRatio + '%',
        });
    }
  });

  $('.video-start').click(function() {
    var $videoFrame = $('#video-frame');

    $videoFrame.attr('src', $videoFrame.attr('src')+'?autoplay=1');
    $(this).hide();
  });
})(jQuery);
