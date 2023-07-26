import {appSchema, tableSchema} from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'trackers',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'date', type: 'string'},
      ],
    }),
  ],
});
