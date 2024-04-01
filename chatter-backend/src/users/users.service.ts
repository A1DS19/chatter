import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { S3Service } from 'src/common/s3/s3.service';
import { USERS_BUCKET, USERS_IMAGE_FILE_EXTENSION } from './constants/options';
import { UserDocument } from './entities/user.document';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly s3Service: S3Service,
  ) {}

  toEntity(user: UserDocument): User {
    const { _id, email, username } = user;

    delete user.password;

    return {
      _id,
      email,
      username,
      imageUrl: this.s3Service.getObjectUrl(
        USERS_BUCKET,
        this.getUserImageUrl(_id),
      ),
    };
  }

  private getUserImageUrl(userId: string) {
    return `${userId}.${USERS_IMAGE_FILE_EXTENSION}`;
  }

  async uploadProfileImage(file: any, userId: string) {
    const key = this.getUserImageUrl(userId);

    await this.s3Service.upload({
      bucket: USERS_BUCKET,
      file: file.buffer,
      key,
    });

    return this.s3Service.getObjectUrl(USERS_BUCKET, key);
  }

  async create(createUserInput: CreateUserInput) {
    try {
      const encryptedPassword = await this.hashPassword(
        createUserInput.password,
      );

      return this.toEntity(
        await this.usersRepository.create({
          ...createUserInput,
          password: encryptedPassword,
        }),
      );
    } catch (error) {
      if (error.code === 11000) {
        throw new UnprocessableEntityException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return (await this.usersRepository.find({})).map(this.toEntity);
  }

  async findOne(_id: string) {
    return this.toEntity(await this.usersRepository.findOne({ _id }));
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashPassword(
        updateUserInput.password,
      );
    }

    return this.toEntity(
      await this.usersRepository.findOneAndUpdate(
        { _id },
        {
          $set: {
            ...updateUserInput,
          },
        },
      ),
    );
  }

  async remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Error logging in');
    }

    return user;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
