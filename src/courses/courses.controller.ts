import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import Course from './course.entity';
import Review from './review.entity';

import { CoursesService } from './courses.service';
import { ParseObjectIdPipe } from '../common/pipes';

import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get(':courseId/reviews')
  async findAllReviews(@Param('courseId', ParseObjectIdPipe) courseId: ObjectID): Promise<Review[]> {
    return this.coursesService.findAllReviews(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':courseId/reviews')
  async createReview(@Param('courseId', ParseObjectIdPipe) courseId: ObjectID,
                     @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.courseId = courseId;
    return this.coursesService.createReview(createReviewDto);
  }
}
