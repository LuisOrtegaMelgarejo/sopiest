import { Module } from '@nestjs/common';
import { LocalFileService } from './localfile/localfile.service';

@Module({
  imports: [
  ],
  providers: [{ provide: 'FileService', useClass: LocalFileService }],
  exports: ['FileService']
})
export class BucketModule {}
