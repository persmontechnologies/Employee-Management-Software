import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsObject, IsArray, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for rating in a review
export class RatingDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Communication'
  })
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty({
    description: 'Rating value (1-5)',
    example: 4
  })
  @Min(1)
  @Max(5)
  @IsNotEmpty({ message: 'Rating value is required' })
  value: number;
}

// DTO for creating a new performance review
export class CreatePerformanceReviewDto {
  @ApiProperty({
    description: 'Employee ID being reviewed',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiProperty({
    description: 'Reviewer\'s employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Reviewer ID is required' })
  reviewerId: string;

  @ApiProperty({
    description: 'Review period (e.g., Q1 2023, 2023 Annual)',
    example: 'Q2 2023'
  })
  @IsString()
  @IsNotEmpty({ message: 'Review period is required' })
  reviewPeriod: string;

  @ApiProperty({
    description: 'Ratings for different categories',
    example: {
      'Communication': 4,
      'Teamwork': 5,
      'Technical Skills': 4,
      'Problem Solving': 3,
      'Adaptability': 4
    }
  })
  @IsObject()
  @IsNotEmpty({ message: 'Ratings are required' })
  ratings: Record<string, number>;

  @ApiProperty({
    description: 'Overall comments and feedback',
    example: 'John has shown excellent progress in technical skills and communication.'
  })
  @IsString()
  @IsNotEmpty({ message: 'Comments are required' })
  comments: string;

  @ApiProperty({
    description: 'Goals for the next period',
    example: [
      'Improve project management skills',
      'Complete AWS certification',
      'Mentor a junior team member'
    ]
  })
  @IsArray()
  @IsString({ each: true })
  goals: string[];
}

// DTO for updating a performance review
export class UpdatePerformanceReviewDto {
  @ApiPropertyOptional({
    description: 'Ratings for different categories',
    example: {
      'Communication': 4,
      'Teamwork': 5,
      'Technical Skills': 4,
      'Problem Solving': 3,
      'Adaptability': 4
    }
  })
  @IsObject()
  @IsOptional()
  ratings?: Record<string, number>;

  @ApiPropertyOptional({
    description: 'Overall comments and feedback',
    example: 'John has shown excellent progress in technical skills and communication.'
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiPropertyOptional({
    description: 'Goals for the next period',
    example: [
      'Improve project management skills',
      'Complete AWS certification',
      'Mentor a junior team member'
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  goals?: string[];
}

// DTO for performance review response
export class PerformanceReviewResponseDto {
  @ApiProperty({
    description: 'Performance review ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Employee ID being reviewed',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @ApiProperty({
    description: 'Reviewer\'s employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  reviewerId: string;

  @ApiProperty({
    description: 'Review period (e.g., Q1 2023, 2023 Annual)',
    example: 'Q2 2023'
  })
  reviewPeriod: string;

  @ApiProperty({
    description: 'Ratings for different categories',
    example: {
      'Communication': 4,
      'Teamwork': 5,
      'Technical Skills': 4,
      'Problem Solving': 3,
      'Adaptability': 4
    }
  })
  ratings: Record<string, number>;

  @ApiProperty({
    description: 'Overall comments and feedback',
    example: 'John has shown excellent progress in technical skills and communication.'
  })
  comments: string;

  @ApiProperty({
    description: 'Goals for the next period',
    example: [
      'Improve project management skills',
      'Complete AWS certification',
      'Mentor a junior team member'
    ]
  })
  goals: string[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-04-01T08:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-04-01T17:00:00.000Z'
  })
  updatedAt: Date;
}

// DTO for filtering performance reviews
export class PerformanceReviewFilterDto {
  @ApiPropertyOptional({
    description: 'Employee ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional({
    description: 'Reviewer ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  reviewerId?: string;

  @ApiPropertyOptional({
    description: 'Review period filter',
    example: 'Q2 2023'
  })
  @IsString()
  @IsOptional()
  reviewPeriod?: string;
}