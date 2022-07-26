import { Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Time } from './entities/time.entity';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time)
    private timeRepository: Repository<Time>,
  ) {}

  create(createTimeDto: CreateTimeDto): Promise<Time> {
    return this.timeRepository
      .findOne({
        userId: createTimeDto.userId,
        exerciseId: createTimeDto.exerciseId,
      })
      .then((value) => {
        if (value != undefined) {
          if (value.time > createTimeDto.time) {
            return this.timeRepository
              .save({
                id: value.id,
                userId: createTimeDto.userId,
                time: createTimeDto.time,
                exerciseId: createTimeDto.exerciseId,
              })
              .then();
          }
        } else {
          return this.timeRepository.save(createTimeDto);
        }
      });
  }

  findAll(): Promise<Time[]> {
    return this.timeRepository.find();
  }

  findOne(id: number): Promise<Time> {
    return this.timeRepository.findOne(id);
  }

  update(id: number, updateTimeDto: UpdateTimeDto) {
    return this.timeRepository.save({
      id: id,
      userId: updateTimeDto.userId,
      time: updateTimeDto.time,
      exerciseId: updateTimeDto.exerciseId,
    });
  }

  async remove(id: number) {
    await this.findOne(id).then((time) => {
      return this.timeRepository.remove(time);
    });
  }

  async getGlobalLeaderBoard(): Promise<[number, number, number][]> {
    return await this.findAll().then((times) => {
      const timesByUser: [number, number, number][] = [];
      times.forEach((time) => {
        const timesForUser = timesByUser.filter((value) => {
          return value[0] == time.userId;
        });
        if (timesForUser.length > 0) {
          let found = false;
          timesByUser.forEach((value) => {
            if (value[0] == time.userId && !found) {
              value[1] += 1;
              value[2] += time.time;
              found = true;
            }
          });
        } else {
          timesByUser.push([time.userId, 1, time.time]);
        }
      });

      if (timesByUser.length > 1) {
        timesByUser.sort((a, b) => {
          if (a[1] != b[1]) {
            return a[1] > b[1] ? -1 : 1;
          } else {
            return a[2] < b[2] ? -1 : 1;
          }
        });
      }
      return timesByUser.slice(0, 10);
    });
  }

  async getLeaderboardForExercise(id: number): Promise<Time[]> {
    return await this.findAll().then((times) => {
      const filteredTimes = times.filter((value) => {
        return value.exerciseId == id;
      });

      if (filteredTimes.length > 1) {
        filteredTimes.sort((a, b) => {
          return a.time < b.time ? -1 : 1;
        });
      }
      return filteredTimes.slice(0, 10);
    });
  }
}
