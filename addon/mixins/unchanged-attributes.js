import Ember from 'ember';
const { Mixin } = Ember;

export default Mixin.create({
  _unchangedPrefix: 'unchanged',
  _unchangedAttributesList: [],

  init() {
    this._super(...arguments);

    this._initUnchangedAttributes();
  },

  _initUnchangedAttributes() {
    this._unchangedAttributes = {};

    this.addObserver('hasDirtyAttributes', this, '_checkDirtyAttributes');
    this._setUnchangedAttributes();

    let _defineUnchangedProperty = (attrName) => {
      Ember.defineProperty(
        this,
        `${this._unchangedPrefix}${Ember.String.capitalize(attrName)}`,
        Ember.computed(`_unchangedAttributes.{${attrName}}`, function() {
          return this._unchangedAttributes[attrName];
        })
      );
    };

    if (Ember.isEmpty(this._unchangedAttributesList)) {
      this.constructor.eachAttribute(_defineUnchangedProperty);
    } else {
      this._unchangedAttributesList.forEach(_defineUnchangedProperty);
    }
  },

  _checkDirtyAttributes() {
    if (!this.get('hasDirtyAttributes')) {
      this._setUnchangedAttributes();
    }
  },

  _setUnchangedAttributes() {
    let _setUnchangedAttribute = (attrName) => {
      Ember.set(this._unchangedAttributes, attrName, this.get(attrName));
    };

    if (Ember.isEmpty(this._unchangedAttributesList)) {
      this.constructor.eachAttribute(_setUnchangedAttribute);
    } else {
      this._unchangedAttributesList.forEach(_setUnchangedAttribute);
    }
  },
});
