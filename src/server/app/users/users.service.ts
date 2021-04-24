import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Provider, User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.usersRepository.save(user);
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  findOneByProvider(provider: Provider, providerId: string) {
    return this.usersRepository.findOne({ where: { provider, providerId } });
  }

  findAll(params: FindManyOptions<User> = {}) {
    return this.usersRepository.find(params);
  }
}
