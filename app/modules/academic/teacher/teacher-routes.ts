import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/non-teachers',
      '/app/modules/academic/teacher/teacher-controller.getNonTeachers'
    ).middleware([getAuthGuard(), 'can:add-teacher']);

    Route.post(
      '/',
      '/app/modules/academic/teacher/teacher-controller.store'
    ).middleware([getAuthGuard(), 'can:add-teacher']);

    Route.get(
      '/',
      '/app/modules/academic/teacher/teacher-controller.index'
    ).middleware([getAuthGuard(), 'can:add-teacher']);

    Route.post(
      '/search',
      '/app/modules/academic/teacher/teacher-controller.index'
    ).middleware([getAuthGuard(), 'can:add-teacher']);
  }).prefix('teachers');
};
