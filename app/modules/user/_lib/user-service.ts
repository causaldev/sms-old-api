import User from 'app/modules/auth/user';

const UserService = {
  findNonTeachers: () => User.query().whereDoesntHave('teacher', (_) => {}),

  findNonHrts: () =>
    User.query()
      .whereHas('teacher', (_) => {})
      .whereDoesntHave('hrt', (_) => {}),
};

export default UserService;
