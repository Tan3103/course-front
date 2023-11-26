import {ModuleModel} from "./module.model";

export class Course {
  id?: any;
  title?: string;
  description?: string;
  language?: string;
  price?: string;
  moduleCount?: number;
  materialCount?: number;
  quizCount?: number;
  moduleList?: ModuleModel[];
}
