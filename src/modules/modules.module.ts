import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { SubjectsModule } from '@modules/subjects/subjects.module';
import { DepartmentsModule } from '@modules/departments/departments.module';
import { RatingsModule } from '@modules/ratings/ratings.module';
import { GroupsModule } from '@modules/groups/groups.module';

@Module({
  imports: [
    DepartmentsModule,
    GroupsModule,
    RatingsModule,
    SubjectsModule,
    UsersModule,
  ],
})
export class ModulesModule {}
