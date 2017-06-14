/* eslint-disable no-new */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../documents';

Meteor.publish('documents.list', () => Documents.find());

new Meteor.Pagination(Documents, {
  name: 'documents.paginatedList',
  /* filters: {
    is_enabled: true,
  }, */
});

Meteor.publish('documents.view', (_id) => {
  check(_id, String);
  return Documents.find(_id);
});
