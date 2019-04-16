(function($) {
  /**
   *  initialize_field
   *
   *  This function will initialize the $field.
   *
   *  @date	30/11/17
   *  @since	5.6.5
   *
   *  @param	n/a
   *  @return	n/a
   */

  function initialize_field($field) {
    //$field.doStuff();

    const gp = new Grapick({
      el: "#gp",
      colorEl: '<input id="colorpicker"/>'
    });

    gp.setColorPicker(handler => {
      const el = handler.getEl().querySelector("#colorpicker");

      $(el).spectrum({
        color: handler.getColor(),
        preferredFormat: "hex",
        showInput: true,
        showAlpha: false,
        change(color) {
          handler.setColor(color.toRgbString());
        },
        move(color) {
          handler.setColor(color.toRgbString(), 0);
        }
      });
    });

    // Do stuff on change of the gradient
    gp.on("change", complete => {
      document.body.style.background = gp.getSafeValue();
      saveHandlersToInput($field, gp.getHandlers());
    });

    // Handlers are color stops
    gp.addHandler(0, "white");
    gp.addHandler(100, "blue");
  }

  if (typeof acf.add_action !== "undefined") {
    /*
     *  ready & append (ACF5)
     *
     *  These two events are called when a field element is ready for initizliation.
     *  - ready: on page load similar to $(document).ready()
     *  - append: on new DOM elements appended via repeater field or other AJAX calls
     *
     *  @param	n/a
     *  @return	n/a
     */

    acf.add_action("ready_field/type=gradient_finder", initialize_field);
    acf.add_action("append_field/type=gradient_finder", initialize_field);
  } else {
    /*
     *  acf/setup_fields (ACF4)
     *
     *  These single event is called when a field element is ready for initizliation.
     *
     *  @param	event		an event object. This can be ignored
     *  @param	element		An element which contains the new HTML
     *  @return	n/a
     */

    $(document).on("acf/setup_fields", function(e, postbox) {
      // find all relevant fields
      $(postbox)
        .find('.field[data-field_type="gradient_finder"]')
        .each(function() {
          // initialize
          initialize_field($(this));
        });
    });
  }

  function saveHandlersToInput(field, handlers) {
    handlers.forEach(handler => {
      console.log(handler.position, handler.color);
    });
    console.log(acf.findField($(field).data("key")));
  }
})(jQuery);
