import React, { useEffect, useState } from "react";
import useForm from "../form.hook";
import { definedFileHook } from "../file.hook";
import errorHook from "./errorHook";
import regularExpressions from "../../misc/regularExpressions";
import { submitFetch } from "../fetchs.hook";
import { environment } from "../../misc/environment";

//interface miscForm {color:string,topAndBottomBackgroundColor:string,tw:string,ig:string,about:string}
export const miscFormInitial:any = { 'color':'' , 'topAndBottomBackgroundColor':'' , 'tw':'' , 'ig':'' , 'about':'' }
interface miscImagesReceivedFromQuery {aboutIMG:string|undefined,pricesIMG:string|undefined,backgroundIMG:string|undefined,bannerIMG:string|undefined}

const initialErrors:{[key:string]:boolean} = { about:false,tw:false,ig:false } ;

const miscForm = (logout:(getOut:boolean) => void,getFetch:() => Promise<void>) => {

    const { formState , setFormState ,
            onInputChange , onResetForm } = useForm(miscFormInitial) ;

    const [ isOpen , setIsOpen ] = useState<boolean>(false) ;

    const { errors , setError , resetErrors } = errorHook([...Object.keys(initialErrors)]);

    const [ miscImagesFromQuery , setMiscImagesFromQuery ] = useState<miscImagesReceivedFromQuery>({} as miscImagesReceivedFromQuery);

    const { file:bannerFile , onChangeEvent:onChangeBanner } = definedFileHook();
    const { file:aboutFile , onChangeEvent:onChangeAbout } = definedFileHook();
    const { file:pricesFile , onChangeEvent:onChangePrices } = definedFileHook();
    const { file:backgroundFile , onChangeEvent:onChangeBackground } = definedFileHook();

    const minAndMaxAbout:[number,number] = [15,700];

    const deleteIMGCallback = (fieldToDelete:'about'|'prices'|'background'|'banner') => {
        const misc = miscImagesFromQuery as any ;
        if(
            !misc[fieldToDelete] &&
            !confirm(`desea borrar la foto de ${fieldToDelete}`)
        ){ return } ;
        submitFetch({
            route:`${environment.backendURL}misc`,
            method:'DELETE',
            headers:{fieldToDelete:`${fieldToDelete}IMG`}
        },() => logout(true))
        .then(() => { getFetch() })
    }

    const submitMiddleware = (e:React.FormEvent<HTMLFormElement>) => {

        resetErrors() ;
        
        const { urlRegExp } = regularExpressions ; const formToUpload = new FormData() ;
        const miscItem:{[key:string]:any} = { 
            ...formState ,
            isOpen
        };

        if(bannerFile){ formToUpload.append('bannerIMG',bannerFile) } ;
        if(aboutFile){ formToUpload.append('aboutIMG',aboutFile) } ;
        if(pricesFile){ formToUpload.append('pricesIMG',pricesFile) } ;
        if(backgroundFile){ formToUpload.append('backgroundIMG',backgroundFile) } ;

        Object.keys(miscItem).forEach(x => {
            const item = formState[x];
            if(['isOpen'].includes(x)){ formToUpload.append(x,`${isOpen}`) }
            if(['tw','ig'].includes(x)){
                if( urlRegExp.test(item) || item == '' ){ formToUpload.append(x,item) }else{ setError(x) };
            }
            if(x == 'about'){
                if(item.length >= minAndMaxAbout[0] && item.length <= minAndMaxAbout[1]){ formToUpload.append(x,item) } else { setError(x) }
            }
            if( new RegExp('color').test(x.toLowerCase()) ){ formToUpload.append(x,item) }
        });

        //query:
        if(
            //hacer query o comprobar el objeto
            true
        ){
            const pass = [ ...Object.keys(errors).filter(x => errors[x]) ];
            if(pass.length == 0){
                submitFetch({
                    route:`${environment.backendURL}misc`,
                    method:'PUT',
                    body:formToUpload
                },() => logout(true))
                .then(() => { getFetch() })
            }
        }else{ console.log(miscItem) }
        
        e.preventDefault();

    }

    const returnBundle = {
        form:{ formState , setFormState , onInputChange , onResetForm , submitMiddleware },
        open:{ isOpen , setIsOpen },
        errors , minAndMaxAbout ,
        miscImagesFromQuery , setMiscImagesFromQuery ,
        onChangesPics:{ onChangeAbout , onChangePrices , onChangeBackground , onChangeBanner } ,
        deleteIMGCallback,
    }

    return returnBundle

}

export default miscForm