import * as UserEntity from '../entity/userEntity.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserEntity.findUsers();

    res.status(200).json({
      status: 'success',
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
