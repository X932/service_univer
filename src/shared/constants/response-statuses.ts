import { HttpStatus } from '@nestjs/common';

export const ResponseStatuses = {
  UNAUTHORIZED: {
    code: HttpStatus.UNAUTHORIZED,
    description: 'Вы не авторизованы',
  },
  OK: {
    code: HttpStatus.OK,
    description: 'Успешно',
  },
  BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    description: 'Данные не верные',
  },
  DEPARTMENT_NOT_FOUND: {
    code: HttpStatus.BAD_REQUEST,
    description: 'Кафедра не найдена',
  },
  GROUP_NOT_FOUND: {
    code: HttpStatus.BAD_REQUEST,
    description: 'Группа не найдена',
  },
};
