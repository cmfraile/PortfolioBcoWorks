import { useState , useEffect } from "react";
import { environment } from "../misc/environment";
import { bundle } from "../misc/interfaces/bundle.interfaces";
import placeholderFetch from "./generalFetch.hook";
import { session } from "./user.hook";

type method = 'GET'|'POST'|'PUT'|'DELETE';
export interface fetchArgument {route:string,method:method,body?:any,headers?:any};
const defaultArgument:fetchArgument = {route:'',method:'GET',body:undefined,headers:undefined}
export interface getData <T>{ data:T|null , isLoading:boolean , error:null|any }

export const miscFill:{[key:string]:string} = {
    'color':'#000000','topAndBottomBackgroundColor':'#ffc0cb',
    'backgroundColor':'#add8e6'
}

export const mainGetFetch = () => {

    const route = `${environment.backendURL}bundle`;
    const fetchBody:[ RequestInfo , RequestInit ] = [route,{ method:'GET',mode:'cors',body:undefined,headers:undefined }];
    const [ fetchData , setFetchData ] = useState<getData<bundle>>({data:null,isLoading:true,error:null});

    const getFetch = async():Promise<void> => {
        setFetchData(v => ({...v,isLoading:true}));
        if(
            //toApi : true , placeholders : false
            true
        ){
            await(await fetch(...fetchBody)).json()
            .then((data:bundle) => {
                //console.log({data})
                setFetchData({
                    data:{...data,misc:{...miscFill,...data.misc}},
                    isLoading:false,
                    error:null
                })
            })
            .catch( error => {
                //console.log({error})
                setFetchData({data:null,isLoading:false,error})
            } );
        }else{
            await placeholderFetch()
            .then( data => { setFetchData(v => ({data,isLoading:false,error:null})) } )
        }
        
    }

    useEffect(() => { getFetch() },[])

    return({fetchData,getFetch});

}

const fetchComponent = async({route,method,body,headers}:fetchArgument = defaultArgument) => new Promise( async(resolve,reject) => {

    const bundle:[string,any] = [route,{method,mode:'cors',body,headers}] ;

    await fetch(...bundle)
    .then( resp => resp.json() )
    //.then(resp => {console.log({resp})})
    .then(resolve)
    .catch(reject)
    
});

export const submitFetch = async(submitFetch:fetchArgument = defaultArgument,logout:() => void) => new Promise( async(resolve,reject) => {

    const crudWithToken = true;

    if(crudWithToken){
        let token:string|undefined = undefined;
        if( localStorage.getItem('session') ){
            const { token:tokenInSession }:session = JSON.parse(`${localStorage.getItem('session')}`) as session ;
            if( tokenInSession ){ token = tokenInSession }else{ logout() }
        } else { logout() }
        if(submitFetch.method == 'DELETE'){ submitFetch.headers = { ...submitFetch.headers , token } }else{ submitFetch.headers = { token } };
    }
    await fetchComponent(submitFetch)
    .then( data => resolve(data) )
    .catch(logout);

});