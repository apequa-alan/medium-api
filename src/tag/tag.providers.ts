import { DataSource } from 'typeorm';
import { TagEntity } from '@app/tag/tag.entity';

export const tagProviders = [
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TagEntity),
    inject: ['DATA_SOURCE'],
  },
];
