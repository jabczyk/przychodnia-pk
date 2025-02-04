import { UserRole, Visit, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { hash } from "~/server/utils/hashing.util";
import { assert } from "~/utils/assert";

type CreateUser = Omit<Prisma.UserCreateInput, "passwordHash"> & {
  password: string;
};

export class UserAccess {
  private static PUBLIC_USER_FIELDS = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
  } as const satisfies Prisma.UserSelect;

  public async createUser(createUser: CreateUser): Promise<string> {
    const { password, ...userData } = createUser;
    const data: Prisma.UserCreateInput = {
      ...userData,
      passwordHash: await hash(password),
    };

    if (createUser.role == UserRole.DOCTOR) {
      data.doctor = {
        create: {},
      };
    } else if (createUser.role == UserRole.PATIENT) {
      data.patient = {
        create: {},
      };
    }

    const user = await db.user.create({
      data,
    });

    return user.id;
  }

  public async findUserById(id: string) {
    const user = await db.user.findUnique({
      where: { id },
    });
    assert(user, "User not found");

    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await db.user.findUnique({
      where: { email },
    });
    assert(user, "User not found");

    return user;
  }

  public async findPublicUserByPesel(pesel: string) {
    const user = await db.user.findUnique({
      where: { pesel },
      select: UserAccess.PUBLIC_USER_FIELDS,
    });
    assert(user, "User not found");

    return user;
  }

  public async findDoctors() {
    const users = await db.user.findMany({
      where: { role: UserRole.DOCTOR },
      select: {
        ...UserAccess.PUBLIC_USER_FIELDS,
        doctor: {
          select: {
            specialization: true,
          },
        },
      },
    });
    assert(users);

    return users.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        specialization: user.doctor?.specialization ?? [],
      };
    });
  }

  public async findDoctorById(doctorId: string) {
    const user = await db.user.findUnique({
      where: { role: UserRole.DOCTOR, id: doctorId },
      select: {
        ...UserAccess.PUBLIC_USER_FIELDS,
        doctor: {
          select: {
            specialization: true,
          },
        },
      },
    });
    assert(user);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      specialization: user.doctor?.specialization ?? [],
    };
  }

  public async updateUser(
    userId: string,
    updatedUser: Prisma.UserUpdateInput,
  ): Promise<string> {
    const user = await db.user.update({
      where: { id: userId },
      data: updatedUser,
      select: { id: true },
    });
    assert(user, "User not found");

    return user.id;
  }

  public async updatePassword(
    userId: string,
    password: string,
  ): Promise<string> {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        passwordHash: await hash(password),
      },
      select: { id: true },
    });
    assert(user, "User not found");

    return user.id;
  }

  public async getUserPrescriptions(userId: string) {
    const prescriptions = await db.visit.findMany({
      where: { patientId: userId },
      select: { prescription: true },
    });

    return prescriptions;
  }

  public async getUserDrugs(userId: string) {
    const drugs = await db.drug.findMany({
      select: {
        name: true,
        description: true,
      },
      where: {
        visits: {
          some: {
            patientId: userId,
          },
        },
      },
    });

    return drugs;
  }

  public async getPatientVisits(userId: string) {
    const visits = await db.visit.findMany({
      where: {
        patientId: userId,
      },
    });

    return visits;
  }
}
