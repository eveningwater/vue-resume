export function debounce(fn:Function, wait:number) {    
    let timeout:any = null;    
    return function() {        
        if(timeout)clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}