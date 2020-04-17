/**
 * Created by amrit on 3/12/2020.
 */

export class CreateCourseModel {
  courseName?: string;
  description?: string;
  tags?: string[];
  coursePrice?: number;
}

export class CourseOptionModel {
  display?: string;
  value?: string;
}
