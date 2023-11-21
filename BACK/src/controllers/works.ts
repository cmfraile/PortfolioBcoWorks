import { definedWork, undefinedWork } from "../interfaces/general";
import WorkCrud from "../models/abstracts/workModel"
import { definedWorkModel, undefinedWorkModel } from "../models/dbModels"

const { router:undefinedWorksRouter } = new WorkCrud<undefinedWork>(undefinedWorkModel);
const { router:definedWorksRouter } = new WorkCrud<definedWork>(definedWorkModel);

export { 
    undefinedWorksRouter , 
    definedWorksRouter
}