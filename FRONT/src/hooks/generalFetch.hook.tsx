import { bundle } from "../misc/interfaces/bundle.interfaces";

import placeholders from "../helpers/fetchWorkPlaceholder";
import { random } from "underscore";

const placeholderFetch = async() => new Promise<bundle>( async (rs,rj) => {

    const { definedWorks , undefinedWorks } = placeholders();
    const imgPlaceholder = () => `https://picsum.photos/${random(500,1000)}/${random(500,1000)}`

    const mainContext:bundle = {
        misc:{
            
            isOpen:true,
            color:'red' , topAndBottomBackgroundColor:'pink' ,
            tw:'https://www.google.es' , ig:'https://www.google.es' ,
            about:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sed nam accusamus autem commodi aliquid illo ut expedita accusantium error dicta maxime distinctio dolorum quam iusto, placeat minus corporis. Iure distinctio exercitationem temporibus itaque! Laboriosam eligendi vitae perspiciatis at unde, dolores quos soluta rerum incidunt ab laborum ad rem pariatur nisi exercitationem eum hic ullam, sint odio quas repudiandae neque saepe. Velit dolorum, at quo sed assumenda porro ut deserunt!',

            bannerIMG:imgPlaceholder(),
            pricesIMG:imgPlaceholder(),
            aboutIMG:imgPlaceholder(),
            backgroundColor:'lightblue' , backgroundIMG:`https://picsum.photos/2000/2000`
            
        },
        definedWorks,
        undefinedWorks
    }

    setTimeout(() => {},random(500,2500));
    return rs(mainContext) ;

})

export default placeholderFetch