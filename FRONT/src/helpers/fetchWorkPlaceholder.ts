import { definedwork , undefinedwork } from "../misc/interfaces/bundle.interfaces";
import { random } from "underscore";

const placeholders = ():{definedWorks:definedwork[],undefinedWorks:undefinedwork[]} => {

    const quantityOfWorks = 100;

    const craftDefinedWork = ():definedwork => ({ 
        pic:`https://picsum.photos/${random(500,1000)}/${random(500,1000)}`,
        name:'Lorem Ipsum',
        link:'https://www.google.es',
        textInLink:'Link al trabajo',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laboriosam optio! Suscipit accusantium error corporis dolores dolorum. Nemo nobis rerum minima provident, quod accusantium sequi aliquid quae, ducimus quibusdam architecto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laboriosam optio! Suscipit accusantium error corporis dolores dolorum. Nemo nobis rerum minima provident, quod accusantium sequi aliquid quae, ducimus quibusdam architecto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laboriosam optio! Suscipit accusantium error corporis dolores dolorum. Nemo nobis rerum minima provident, quod accusantium sequi aliquid quae, ducimus quibusdam architecto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laboriosam optio! Suscipit accusantium error corporis dolores dolorum. Nemo nobis rerum minima provident'
    });
    
    const craftUndefinedWork = ():undefinedwork => ({
        pic:`https://picsum.photos/${random(500,1000)}/${random(500,1000)}`,
        isSFW:(random(0,1)) ? true : false ,
        uploadDate:new Date(Date.now() + random(-999999999,0)) ,
    });

    let definedWorks:definedwork[] = [] ; let undefinedWorks:undefinedwork[] = [] ;
    for( let i = 0 ; i < quantityOfWorks ; i++ ){ if(i <= 5){ definedWorks.push(craftDefinedWork()) } ; undefinedWorks.push(craftUndefinedWork()) } ;

    undefinedWorks = undefinedWorks
    .sort((a,b) => (a.uploadDate > b.uploadDate) ? 1 : -1)
    .sort((a,b) => (a.isSFW == b.isSFW) ? 0 : (a.isSFW) ? -1 : (b.isSFW) ? 1 : 0);

    return { definedWorks , undefinedWorks }

}

export default placeholders