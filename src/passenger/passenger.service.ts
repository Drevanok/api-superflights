import { HttpStatus, Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from './interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async createPassenger(passengerDto: PassengerDTO): Promise<IPassenger> {
    const { email } = passengerDto;

    const emailExists = await this.model.findOne({ email });
    if (emailExists) {
      throw new Error('this passenger already exists');
    }

    const passenger = new this.model(passengerDto);
    return await passenger.save();
  }

  async getAllPassengers(): Promise<IPassenger[]> {

    
    const passengers = await this.model.find();
    if(!passengers || passengers.length === 0){
      throw new Error('No passengers found');
    }

    return passengers;
  }

  async getPassengerById(id: string): Promise<IPassenger> {
    const passenger = await this.model.findById(id);
    if (!passenger) {
      throw new Error('Passenger not found');
    }

    return passenger;
  }

  async updatePassenger(
    id: string,
    passengerDto: PassengerDTO,
  ): Promise<IPassenger> {
    const passengerExists = await this.model.findById(id);
    if (!passengerExists) {
      throw new Error('Passenger not found');
    }

    const passenger = {...passengerDto };

    const passengerUpdate = await this.model.findByIdAndUpdate(id, passenger, {
      new: true,
    });

    if (!passengerUpdate) {
      throw new Error('Error updating passenger');
    }

    return passengerUpdate;
  }

  async deletePassenger(id : string) {
    const passengerDelete = await this.model.findByIdAndDelete(id);

    if(!passengerDelete){
        throw new Error('Passenger not found');
    }

    return { status: HttpStatus.OK, message: 'Passenger deleted successfully' };
  }
}
