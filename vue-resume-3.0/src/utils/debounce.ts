export function debounce(fn:Function, wait:number) {    
    let timeout:number | null = null;    
    return function() {        
        if(timeout)clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}