interface bundle {misc:{[key:string]:any},definedWorks:definedWork[],undefinedWorks:undefinedWork[]} ;

interface misc {

    isOpen:boolean,
    color?:string,              topAndBottomBackgroundColor?:string,
    tw?:string,                 ig?:string,

    backgroundColor?:string,    backgroundIMG?:string,
                                bannerIMG?:string,
    about?:string,              aboutIMG?:string,
                                pricesIMG?:string,

}

interface definedWork {
    pic:string,
    name:string,
    description:string,
    textInLink:string,
    link?:string,
    uploadDate:Date
} ;

interface undefinedWork {
    pic:string,
    isSFW:boolean,
    uploadDate:Date
} ;

const picFields = ['aboutIMG','backgroundIMG','pricesIMG','pic'];

export { bundle , misc , definedWork , undefinedWork , picFields }