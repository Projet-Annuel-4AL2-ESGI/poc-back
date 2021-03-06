import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetUsers } from './dto/get-users';
import { Follow } from '../follow/entities/follow.entity';
import { GetUsersFollow } from './dto/get-users-follow';
import { GetUserProfile } from './dto/get-user-profile';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.find();
    const usersFiltered: GetUsers[] = [];
    users.forEach(function (user) {
      const userTemp: GetUsers = {
        id: user.id,
        username: user.username,
        image: user.image,
      };
      usersFiltered.push(userTemp);
    });
    return usersFiltered;
  }

  async findFollows(id: number) {
    const usersFiltered: GetUsersFollow[] = [];
    const users = await this.userRepository.find();
    const follows = await this.followRepository.find({
      where: { follower: id },
    });
    let isItThere = false;
    if (follows.length === 0) {
      users.forEach(function (user) {
        if (user.id != id) {
          const userTemp: GetUsersFollow = {
            id: user.id,
            username: user.username,
            follow: false,
            image: user.image,
          };
          usersFiltered.push(userTemp);
        }
      });
    } else {
      users.forEach(function (user) {
        follows.forEach(function (follow) {
          if (user.id == follow.following) {
            isItThere = true;
          }
        });
        if (isItThere != true) {
          const userTemp: GetUsersFollow = {
            id: user.id,
            username: user.username,
            follow: false,
            image: user.image,
          };
          if (user.id != id) {
            usersFiltered.push(userTemp);
          }
        }
        isItThere = false;
      });
    }
    return usersFiltered.sort(() => Math.random() - Math.random()).slice(0, 5);
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findOneProfile(id: number) {
    const user = await this.userRepository.findOne(id);
    const followingLenght = await this.followRepository.find({
      where: { follower: id },
    });
    const followerLenght = await this.followRepository.find({
      where: { following: id },
    });

    const getUserProfile: GetUserProfile = {
      id: user.id,
      email: user.email,
      username: user.username,
      followers: followerLenght.length,
      followings: followingLenght.length,
      image: user.image,
    };

    return getUserProfile;
  }

  async findFollowingsList(id: number) {
    const followingList = await this.followRepository.find({
      where: { follower: id },
    });
    const followingIds: number[] = [];
    for (const following of followingList) {
      followingIds.push(following.following);
    }
    const users = await this.userRepository.findByIds(followingIds);
    const usersFiltered: GetUsersFollow[] = [];
    users.forEach(function (user) {
      const userTemp: GetUsersFollow = {
        id: user.id,
        username: user.username,
        follow: false,
        image: user.image,
      };
      usersFiltered.push(userTemp);
    });
    return usersFiltered;
  }

  async findFollowersList(id: number) {
    const followingList = await this.followRepository.find({
      where: { following: id },
    });
    const followingIds: number[] = [];
    for (const following of followingList) {
      followingIds.push(following.follower);
    }
    const users = await this.userRepository.findByIds(followingIds);
    const usersFiltered: GetUsersFollow[] = [];
    users.forEach(function (user) {
      const userTemp: GetUsersFollow = {
        id: user.id,
        username: user.username,
        follow: false,
        image: user.image,
      };
      usersFiltered.push(userTemp);
    });
    return usersFiltered;
  }

  findByMail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ id: id, email: updateUserDto.email });
  }

  addImage(id: number, updateImageDto: UpdateImageDto) {
    return this.userRepository.update(id, { image: updateImageDto.image });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
