import {
  addColumns,
  schemaMigrations,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'trackers',
          columns: [
            {
              name: 'type',
              type: 'string',
              isOptional: true,
            },
          ],
        }),
      ],
    },
  ],
});
