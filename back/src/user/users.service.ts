import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, ModifyUserDTO } from './user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (!createUserDTO.password) {
      throw new Error('Password is required');
    }
  
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
    return this.userRepository.save(createUserDTO);
  }
  
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: { id: id },
     });
  }

  async findOneByUserId(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { userId: userId },
    });
  }

  async modify(modifyUserDTO: ModifyUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: modifyUserDTO.id },
     });
    user.password = await bcrypt.hash(modifyUserDTO.newPassword, 10);
    return this.userRepository.save(user);
  }
  // TODO: more methods
}
