import { ObjectID } from "mongodb";
import { IsNotEmpty, IsInt } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  comments: string;

  @IsInt()
  score: number;

  courseId?: ObjectID;
}