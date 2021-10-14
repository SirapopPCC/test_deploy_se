import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Course from './course.entity';
import Review from './review.entity';

import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.save(createCourseDto);
  }

  async findAllReviews(courseId: ObjectID): Promise<Review[]> {
    return this.reviewsRepository.find({where:{ courseId: courseId }});
  }

  async createReview(createReviewDto: CreateReviewDto) {
    return this.reviewsRepository.save(createReviewDto);
  }
}