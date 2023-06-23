import { z } from 'zod';
import { USER_ROLES } from './user.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'firstName is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'lastName is required' }),
      }),
      dateOfBirth: z.string().optional(),
      gender: z.enum(USER_ROLES).optional(),
      bloodGroup: z.enum(USER_ROLES).optional(),
      email: z.string({ required_error: 'email is required' }).email(),
      contactNo: z.string({ required_error: 'contactNo is required' }),
      emergencyContactNo: z.string({
        required_error: 'emergencyContactNo is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'fatherName is required' }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({ required_error: 'motherName is required' }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'matherContactNo is required',
        }),
        address: z.string({ required_error: 'address is required' }),
      }),

      localGuardian: z.object({
        name: z.string({ required_error: 'name is required' }),
        occupation: z.string({ required_error: 'occupation is required' }),
        contactNo: z.string({ required_error: 'contactNo is required' }),
        address: z.string({ required_error: 'address is required' }),
      }),

      profileImage: z.string({ required_error: 'profile image is required' }),
      academicFaculty: z.string({
        required_error: 'academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'academic semester is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
};
