import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, EditUserDto, RegisterJobDto } from './dtos';
import { Job, User } from './models';

export interface UserFindOne {
  id?: number;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOneBy({id: id})
      .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }

  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOneBy({ email: dto.email });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editOne(id: number, dto: EditUserDto, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    return await this.userRepository.remove(user);
  }

  async findOne(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }

  async addJob(id: number, dto: RegisterJobDto, userEntity?: User) {
    const user = await this.getOneWithJobs(id, userEntity);
    dto.selectedJobs.forEach(job => {
      if (!user.selectedJobs.find(exis => exis.jobId === job.jobId)) {
        user.selectedJobs.push(job as Job);
      }
    });
    // const editedUser = Object.assign(user, dto);
    await this.userRepository.save(user);
    return this.getOneWithJobs(id, userEntity);
  }

  async removeJob(id: number, dto: RegisterJobDto, userEntity?: User) {
    const user = await this.getOneWithJobs(id, userEntity);
    dto.selectedJobs.forEach(job => {
      const index = user.selectedJobs.findIndex(exis => exis.jobId === job.jobId);
      if (index > -1) {
        user.selectedJobs.splice(index, 1);
      }
    })
    // const editedUser = Object.assign(user, dto);
    await this.userRepository.save(user);
    return this.getOneWithJobs(id, userEntity);
  }

  async getOneWithJobs(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({
        relations: {
          selectedJobs: true
        },
        where: {
          id: id
        }
      })
      .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }
}
