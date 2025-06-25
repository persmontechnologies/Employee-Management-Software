import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreatePerformanceReviewDto, 
  UpdatePerformanceReviewDto, 
  PerformanceReviewFilterDto 
} from './dto/performance-review.dto';
import { PerformanceReview } from 'shared';

@Injectable()
export class PerformanceReviewsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new performance review
   * @param createPerformanceReviewDto - Performance review creation data
   * @returns Newly created performance review
   */
  async create(createPerformanceReviewDto: CreatePerformanceReviewDto): Promise<PerformanceReview> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: createPerformanceReviewDto.employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${createPerformanceReviewDto.employeeId} not found`);
    }

    // Check if reviewer exists
    const reviewerExists = await this.prisma.employee.findUnique({
      where: { id: createPerformanceReviewDto.reviewerId },
    });

    if (!reviewerExists) {
      throw new NotFoundException(`Reviewer with ID ${createPerformanceReviewDto.reviewerId} not found`);
    }

    // Check if employee and reviewer are the same person
    if (createPerformanceReviewDto.employeeId === createPerformanceReviewDto.reviewerId) {
      throw new BadRequestException('Employee cannot review themselves');
    }

    // Validate ratings (all should be between 1-5)
    for (const [category, rating] of Object.entries(createPerformanceReviewDto.ratings)) {
      if (rating < 1 || rating > 5) {
        throw new BadRequestException(`Rating for ${category} must be between 1 and 5`);
      }
    }

    // Check if a review already exists for this employee, reviewer, and period
    const existingReview = await this.prisma.performanceReview.findFirst({
      where: {
        employeeId: createPerformanceReviewDto.employeeId,
        reviewerId: createPerformanceReviewDto.reviewerId,
        reviewPeriod: createPerformanceReviewDto.reviewPeriod,
      },
    });

    if (existingReview) {
      throw new ConflictException(
        `A review already exists for this employee by this reviewer for ${createPerformanceReviewDto.reviewPeriod}`
      );
    }

    // Create performance review
    const review = await this.prisma.performanceReview.create({
      data: {
        employeeId: createPerformanceReviewDto.employeeId,
        reviewerId: createPerformanceReviewDto.reviewerId,
        reviewPeriod: createPerformanceReviewDto.reviewPeriod,
        ratings: createPerformanceReviewDto.ratings,
        comments: createPerformanceReviewDto.comments,
        goals: createPerformanceReviewDto.goals,
      },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapReviewToDto(review);
  }

  /**
   * Find all performance reviews with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of performance reviews
   */
  async findAll(filter?: PerformanceReviewFilterDto): Promise<PerformanceReview[]> {
    const where: any = {};

    // Apply filters if provided
    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.reviewerId) {
      where.reviewerId = filter.reviewerId;
    }

    if (filter?.reviewPeriod) {
      where.reviewPeriod = filter.reviewPeriod;
    }

    const reviews = await this.prisma.performanceReview.findMany({
      where,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews.map(review => this.mapReviewToDto(review));
  }

  /**
   * Find a performance review by ID
   * @param id - Performance review ID
   * @returns Performance review
   * @throws NotFoundException if review not found
   */
  async findOne(id: string): Promise<PerformanceReview> {
    const review = await this.prisma.performanceReview.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`Performance review with ID ${id} not found`);
    }

    return this.mapReviewToDto(review);
  }

  /**
   * Update a performance review
   * @param id - Performance review ID
   * @param updatePerformanceReviewDto - Performance review update data
   * @returns Updated performance review
   * @throws NotFoundException if review not found
   */
  async update(id: string, updatePerformanceReviewDto: UpdatePerformanceReviewDto): Promise<PerformanceReview> {
    // Check if review exists
    const reviewExists = await this.prisma.performanceReview.findUnique({
      where: { id },
    });

    if (!reviewExists) {
      throw new NotFoundException(`Performance review with ID ${id} not found`);
    }

    // Validate ratings if provided
    if (updatePerformanceReviewDto.ratings) {
      for (const [category, rating] of Object.entries(updatePerformanceReviewDto.ratings)) {
        if (rating < 1 || rating > 5) {
          throw new BadRequestException(`Rating for ${category} must be between 1 and 5`);
        }
      }
    }

    // Update review
    const review = await this.prisma.performanceReview.update({
      where: { id },
      data: updatePerformanceReviewDto,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapReviewToDto(review);
  }

  /**
   * Delete a performance review
   * @param id - Performance review ID
   * @returns Deleted performance review
   * @throws NotFoundException if review not found
   */
  async remove(id: string): Promise<PerformanceReview> {
    // Check if review exists
    const reviewExists = await this.prisma.performanceReview.findUnique({
      where: { id },
    });

    if (!reviewExists) {
      throw new NotFoundException(`Performance review with ID ${id} not found`);
    }

    // Delete review
    const review = await this.prisma.performanceReview.delete({
      where: { id },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapReviewToDto(review);
  }

  /**
   * Get reviews for an employee
   * @param employeeId - Employee ID
   * @returns Performance reviews for the employee
   */
  async getEmployeeReviews(employeeId: string): Promise<PerformanceReview[]> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    // Get all reviews for the employee
    const reviews = await this.prisma.performanceReview.findMany({
      where: {
        employeeId,
      },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews.map(review => this.mapReviewToDto(review));
  }

  /**
   * Get reviews by a reviewer
   * @param reviewerId - Reviewer ID
   * @returns Performance reviews by the reviewer
   */
  async getReviewerReviews(reviewerId: string): Promise<PerformanceReview[]> {
    // Check if reviewer exists
    const reviewerExists = await this.prisma.employee.findUnique({
      where: { id: reviewerId },
    });

    if (!reviewerExists) {
      throw new NotFoundException(`Reviewer with ID ${reviewerId} not found`);
    }

    // Get all reviews by the reviewer
    const reviews = await this.prisma.performanceReview.findMany({
      where: {
        reviewerId,
      },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews.map(review => this.mapReviewToDto(review));
  }

  /**
   * Calculate performance statistics
   * @param departmentId - Optional department ID filter
   * @returns Performance statistics
   */
  async getStatistics(departmentId?: string): Promise<any> {
    // Define the filter
    const where: any = {};
    
    if (departmentId) {
      where.employee = {
        departmentId,
      };
    }

    // Get all reviews matching the filter
    const reviews = await this.prisma.performanceReview.findMany({
      where,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
        reviewer: {
          include: {
            user: true,
          },
        },
      },
    });

    // Calculate statistics
    const totalReviews = reviews.length;
    
    // Get all unique review periods
    const reviewPeriods = [...new Set(reviews.map(review => review.reviewPeriod))];
    
    // Get all unique rating categories
    const allCategories = new Set<string>();
    reviews.forEach(review => {
      Object.keys(review.ratings).forEach(category => {
        allCategories.add(category);
      });
    });
    
    const categories = Array.from(allCategories);

    // Calculate average ratings by category
    const categoryAverages: Record<string, number> = {};
    categories.forEach(category => {
      const ratings = reviews
        .filter(review => review.ratings[category] !== undefined)
        .map(review => review.ratings[category]);
      
      const sum = ratings.reduce((total, rating) => total + rating, 0);
      categoryAverages[category] = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(2)) : 0;
    });

    // Calculate average ratings by department
    const departmentAverages: Record<string, any> = {};
    
    reviews.forEach(review => {
      const deptName = review.employee.department.name;
      
      if (!departmentAverages[deptName]) {
        departmentAverages[deptName] = {
          count: 0,
          totalRating: 0,
          categories: {},
        };
        
        categories.forEach(category => {
          departmentAverages[deptName].categories[category] = {
            sum: 0,
            count: 0,
          };
        });
      }
      
      departmentAverages[deptName].count++;
      
      let reviewAverage = 0;
      let reviewCount = 0;
      
      Object.entries(review.ratings).forEach(([category, rating]) => {
        if (categories.includes(category)) {
          departmentAverages[deptName].categories[category].sum += rating;
          departmentAverages[deptName].categories[category].count++;
          reviewAverage += rating;
          reviewCount++;
        }
      });
      
      if (reviewCount > 0) {
        departmentAverages[deptName].totalRating += (reviewAverage / reviewCount);
      }
    });
    
    // Calculate final department averages
    Object.keys(departmentAverages).forEach(deptName => {
      const dept = departmentAverages[deptName];
      
      // Calculate overall average
      dept.average = dept.count > 0 ? parseFloat((dept.totalRating / dept.count).toFixed(2)) : 0;
      
      // Calculate category averages
      const categoryAverages: Record<string, number> = {};
      Object.entries(dept.categories).forEach(([category, data]: [string, any]) => {
        categoryAverages[category] = data.count > 0 ? parseFloat((data.sum / data.count).toFixed(2)) : 0;
      });
      
      dept.categoryAverages = categoryAverages;
      
      // Remove intermediate data
      delete dept.totalRating;
      delete dept.categories;
    });

    return {
      totalReviews,
      reviewPeriods,
      categories,
      categoryAverages,
      departmentAverages,
      filter: {
        departmentId: departmentId || 'All departments',
      },
    };
  }

  /**
   * Map Prisma performance review object to DTO format
   * @param review - Prisma performance review object
   * @returns Performance review DTO object
   */
  private mapReviewToDto(review: any): PerformanceReview {
    return {
      id: review.id,
      employeeId: review.employeeId,
      employee: review.employee ? {
        id: review.employee.id,
        userId: review.employee.userId,
        user: review.employee.user ? {
          id: review.employee.user.id,
          email: review.employee.user.email,
          firstName: review.employee.user.firstName,
          lastName: review.employee.user.lastName,
          role: review.employee.user.role,
          createdAt: review.employee.user.createdAt,
          updatedAt: review.employee.user.updatedAt,
        } : undefined,
        departmentId: review.employee.departmentId,
        department: review.employee.department ? {
          id: review.employee.department.id,
          name: review.employee.department.name,
          createdAt: review.employee.department.createdAt,
          updatedAt: review.employee.department.updatedAt,
        } : undefined,
        position: review.employee.position,
        dateOfJoining: review.employee.dateOfJoining,
        salary: review.employee.salary,
        createdAt: review.employee.createdAt,
        updatedAt: review.employee.updatedAt,
      } : undefined,
      reviewerId: review.reviewerId,
      reviewer: review.reviewer ? {
        id: review.reviewer.id,
        userId: review.reviewer.userId,
        user: review.reviewer.user ? {
          id: review.reviewer.user.id,
          email: review.reviewer.user.email,
          firstName: review.reviewer.user.firstName,
          lastName: review.reviewer.user.lastName,
          role: review.reviewer.user.role,
          createdAt: review.reviewer.user.createdAt,
          updatedAt: review.reviewer.user.updatedAt,
        } : undefined,
        departmentId: review.reviewer.departmentId,
        department: review.reviewer.department ? {
          id: review.reviewer.department.id,
          name: review.reviewer.department.name,
          createdAt: review.reviewer.department.createdAt,
          updatedAt: review.reviewer.department.updatedAt,
        } : undefined,
        position: review.reviewer.position,
        dateOfJoining: review.reviewer.dateOfJoining,
        salary: review.reviewer.salary,
        createdAt: review.reviewer.createdAt,
        updatedAt: review.reviewer.updatedAt,
      } : undefined,
      reviewPeriod: review.reviewPeriod,
      ratings: review.ratings,
      comments: review.comments,
      goals: review.goals,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}