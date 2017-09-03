# ember-unchanged-attributes

Ember plugin which allows you to get initial value of model object's attributes after they were changed.

Sometimes, you don't need to update attributes values in view until model is saved. For example, you can have edit form in modal and you don't want values to update on background until model object is successfully saved, because it can confuse user.
This plugin can help you with this issue!

## Installation

`ember install ember-unchanged-attributes`

## Usage

First, you need to import module and extend needed model.

```js
import UnchangedAttributesMixin from 'ember-unchanged-attributes';

DS.Model.extend(UnchangedAttributesMixin, {
  name: attr(),
});
```
After this, you can access unchanged value of any attribute by `unchanged#{AttrName}` property

```js
let user = this.store.createRecord('user', { name: 'Jack' });
user.get('unchangedName');
> "Jack"
user.set('name', 'Billy');
user.get('unchangedName');
> "Jack"
```

After you save object, it will reset unchanged attributes

```js
user.save().then((user) => {
  user.get('unchangedName') // => will equal to "Billy"
});
```

Also, if you wan't to have unchanged properties for specific attributes only, you can specify ```_unchangedAttributesList``` in your model. And you can also specify prefix for these attributes with ```_unchangedPrefix```.

```js
import UnchangedAttributesMixin from 'ember-unchanged-attributes';

DS.Model.extend(UnchangedAttributesMixin, {
  _unchangedPrefix: 'original',
  _unchangedAttributesList: ['content'],

  title: attr(),
  content: attr(),
});

...

let article = this.store.createRecord('article', { title: 'Best Article', content: 'Best Content' })
article.set('content', 'Lorem Ipsum')
article.get('originalContent')
> "Best Content"
article.get('originalTitle')
> Will throw exception, since 'title' is not specified in '_unchangedAttributesList'
```
