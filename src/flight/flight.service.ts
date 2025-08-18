import { HttpStatus, Injectable } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from './interface/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async createFlight(flightDto: FlightDTO): Promise<IFlight> {
    const { pilot, flightDate } = flightDto;
    const flightExists = await this.model.findOne({ pilot, flightDate });

    if (flightExists) {
      throw new Error('Flight with this pilot and date already exists');
    }

    const newFlight = new this.model(flightDto);
    return await newFlight.save();
  }

  async getAllFlights(): Promise<IFlight[]> {
    const flights = await this.model.find().populate('passengers');

    if (!flights || flights.length === 0) {
      throw new Error('No flights found');
    }

    return flights;
  }

  async getFlightById(id: string): Promise<IFlight> {
    const flight = await this.model.findById(id).populate('passengers');
    if (!flight) {
      throw new Error('Flight not found');
    }

    return flight;
  }

  async updateFlight(id: string, flightDto: FlightDTO): Promise<IFlight> {
    const { pilot, flightDate } = flightDto;
    const flightExists = await this.model.findById(id);
    const flights = await this.model.find({
      pilot,
      flightDate,
      _id: { $ne: id },
    });

    if (!flightExists) {
      throw new Error('Flight not found');
    }

    if (pilot && flightDate && flights.length > 0) {
      throw new Error('Flight with this pilot and date already exists');
    }

    const flight = { ...flightDto };
    const flightUpdate = await this.model.findByIdAndUpdate(id, flight, {
      new: true,
    });

    if (!flightUpdate) {
      throw new Error('Error updating flight');
    }

    return flightUpdate;
  }

  async deleteFlight(id: string) {
    const flightDelete = await this.model.findByIdAndDelete(id);
    if (!flightDelete) {
      throw new Error('Flight not found');
    }

    return { message: HttpStatus.OK, status: 'Flight deleted successfully' };
  }

  async addPassengerToFlight(
    flightId: string,
    passengerId: string,
  ): Promise<IFlight> {
    const addPassenger =  await this.model.findByIdAndUpdate(
      flightId,
      { $addToSet: { passengers: passengerId } },
      { new: true },
    ).populate('passengers');

    if(!addPassenger){
        throw new Error('Flight not found')
    }

    return addPassenger;
  }
}
