import { ObjectDirective } from "vue";
type instanceValue = {
    speed?:string
}
const filterNotIntNumber:ObjectDirective = {
    mounted(el,binding){
        el.oninput = (e:MouseEvent) => {
            const value = (e.target as HTMLInputElement).value;
            if(isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 100){
                (e.target as HTMLInputElement).value = "";
                (binding.instance as instanceValue).speed = "";
            }
        }
    }
}
export default filterNotIntNumber;