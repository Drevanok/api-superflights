import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';

@Controller('/api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post('/create-flight')
  createFlight(@Body() flightDto: FlightDTO) {
    return this.flightService.createFlight(flightDto);
  }

  @Get('/get-all-flights')
  getAllFlights() {
    return this.flightService.getAllFlights();
  }

  @Get('/get-flight/:id')
  getFlightById(@Param('id') id: string) {
    return this.flightService.getFlightById(id);
  }

  @Put('/update-flight/:id')
  updateFlight(@Param('id') id: string, @Body() flightDto: FlightDTO) {
    return this.flightService.updateFlight(id, flightDto);
  }

  @Delete('/delete-flight/:id')
  deleteFlight(@Param('id') id: string) {
    return this.flightService.deleteFlight(id);
  }

  @Post('/add-passenger/flight/:flightId/passenger/:passengerId')
  async addPassengerToFlight(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.getPassengerById(passengerId);
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this.flightService.addPassengerToFlight(flightId, passengerId)
  }
}
