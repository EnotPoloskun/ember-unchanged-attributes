import DS from 'ember-data';
import UnchangedAttributesMixin from 'ember-unchanged-attributes';

export default DS.Model.extend(UnchangedAttributesMixin, {
  name: DS.attr('string'),
  country: DS.attr('string', {
    defaultValue() { return "Belarus"; }
  }),
});
