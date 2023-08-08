import { Printer } from "./_printer";

class PrinterConsoleDebug extends Printer {

    constructor(){
        super();
    }

    write(data){
        console.log(data);
    }

    read(){ return null }

}

export { PrinterConsoleDebug };
