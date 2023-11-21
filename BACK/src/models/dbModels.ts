import { model, Schema } from "mongoose";

import { definedWork, misc, undefinedWork } from "../interfaces/general";

const userModel = model(
    'user',
    new Schema<{email:string}>({
        email:{type:String,required:true}
    }),
    'user'
)

const miscModel = model(
    'misc',
    new Schema<misc>({
        isOpen:{type:Boolean,required:false},
        color:{type:String,required:false} , topAndBottomBackgroundColor:{type:String,required:false} ,
        bannerIMG:{type:String,required:false} ,
        aboutIMG:{type:String,required:false} , about:{type:String,required:false} ,
        backgroundIMG:{type:String,required:false} , 
        pricesIMG:{type:String,required:false} ,
        tw:{type:String,required:false} , ig:{type:String,required:false} ,
    },{capped:{max:1}}),
    'misc',
);

const undefinedWorkModel = model(
    'undefinedWork',
    new Schema<undefinedWork>({
        pic:{type:String,required:true},
        isSFW:{type:Boolean,required:true},
        uploadDate:{type:Date,required:true},
    }),
    'undefinedWork'
);

const definedWorkModel = model(
    'definedWork',
    new Schema<definedWork>({
        pic:{type:String,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        link:{type:String,required:false},
        uploadDate:{type:Date,required:true},
    }),
    'definedWork'
)

export { userModel , miscModel , definedWorkModel , undefinedWorkModel }