jQuery.noConflict();

var resizeTimer;

(function($) {
  $(window).bind('load', function() {
    var $window = $(window);
    var $document= $(document);
    var $pageContent = $('#page-content');
    var $sectionFooter = $('#page-content').find('footer');
    var $pageFooter = $('#page-footer');

    /**
     * Set sticky footer status
     */
    function stickyFooter() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // console.log('WINDOW = ' + $window.height() + 'px');
        // console.log('DOCUMENT = ' + $document.height() + 'px');
        // console.log('PAGE_FOOTER = ' + $pageFooter.outerHeight() + 'px');
        // console.log('SECTION_FOOTER = ' + $sectionFooter.outerHeight() + 'px');

        if ($window.height() < $document.height()) {
          $pageFooter.css({'position': 'static', 'width': 'auto', 'bottom': 'auto'});
          $sectionFooter.css({'position': 'relative', 'width': 'auto', 'bottom': 'auto'});
          $pageContent.css({'padding-bottom': '0'});
        } else {
          $pageFooter.css({'position': 'fixed', 'width': '100%', 'bottom': '0'});
          $sectionFooter.css({'position': 'fixed', 'width': '100%', 'bottom': $pageFooter.outerHeight() + 'px'});
          $pageContent.css({'padding-bottom': $pageFooter.outerHeight() + $sectionFooter.outerHeight() + 'px'});
        }
      }, 250);
    }

    stickyFooter();

    $window.on('resize', stickyFooter);
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
      $input.parsley().validate();
      $fill.width(fill);
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
      $select.parsley().validate();
      $this.find('.slider-1_fill').width(fill);
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
      $(this).parsley().validate();
      $(this).attr('placeholder', '');
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
    vertical: 'top',
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
})(jQuery);
