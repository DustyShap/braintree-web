'use strict';

var InputComponents = require('./index');
var whitelistedFields = require('../../shared/constants').whitelistedFields;
var LabelComponent = require('./label').LabelComponent;
var events = require('../../shared/constants').events;
var classlist = require('../../../lib/classlist');

module.exports = {
  FieldComponent: function FieldComponent(options) {
    var type = options.type;
    var attribution = whitelistedFields[type];

    this.element = document.createDocumentFragment();

    this.label = new LabelComponent(attribution);
    this.element.appendChild(this.label.element);

    this.input = new InputComponents[type]({
      model: options.cardForm,
      type: type
    });
    this.input.element.setAttribute('aria-describedby', 'field-description-' + type);
    this.element.appendChild(this.input.element);

    this.description = document.createElement('div');
    this.description.id = 'field-description-' + type;
    classlist.add(this.description, 'field-description');
    this.description.style.height = '1px';
    this.description.style.width = '1px';
    this.description.style.overflow = 'hidden';

    this.element.appendChild(this.description);

    global.bus.on(events.SET_MESSAGE, function (field, message) {
      if (field === type) {
        this.description.textContent = message;
      }
    }.bind(this));
  }
};
