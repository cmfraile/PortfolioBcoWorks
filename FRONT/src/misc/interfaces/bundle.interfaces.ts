export interface bundle {
    misc:misc;
    undefinedWorks:undefinedwork[];
    definedWorks:definedwork[];
}

export interface definedwork {
    _id?:string;
    pic:string;
    name:string;
    description:string;
    textInLink?:string;
    link?:string;
    uploadDate?:string;
    __v?:number;
}

export interface misc {

    _id?:string,
    __v?:number,

    isOpen:boolean,
    color?:string,              topAndBottomBackgroundColor?:string,
    tw?:string,                 ig?:string,

    backgroundColor?:string,    backgroundIMG?:string,
                                bannerIMG?:string,
    about?:string,              aboutIMG?:string,
                                pricesIMG?:string,

}

export interface undefinedwork {
    _id?:string;
    pic:string;
    isSFW:boolean;
    uploadDate:Date;
    __v?:number;
}
