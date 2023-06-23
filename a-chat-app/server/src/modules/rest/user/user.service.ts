import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { UserUtil } from './user.util';
import configs from '../../../configs';

const createStudent = async (student: any, user: IUser): Promise<IUser | null> => {
  //default pass
  if (!user.password) {
    user.password = configs.env as string;
  }

  //set role
  user.role = 'student';

  const academicSemester = await User.findById(student.academicSemester);

  let newUserAllData;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await UserUtil.generateStudentID(academicSemester);
    user.id = id;
    student.id = id;

    const createdStudent = await User.create([student], [session]);

    if (!createdStudent.length) {
      throw new ApiError(400, 'Failed to create student');
    }

    //set student -> _id into user.student
    user.student = createdStudent[0]._id;
    const newUser = await User.create([user], [session]);

    if (!newUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user -> student -> academicSemester, academicDepartment, academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
