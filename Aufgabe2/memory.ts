namespace L02_BlackmailerCompanion{
console.log("Start");
let chosenCharacter :string;
window.addEventListener("load",handleLoad);

function handleLoad(_event:Event): void {
    let mail: HTMLElement = <HTMLElement>document.querySelector("div#mail");
    mail.addEventListener("click", placeLetter);
    document.addEventListener("keydown", chooseLetter);


}

    function placeLetter(_event:MouseEvent): void{
        console.log (_event);

    }
    function chooseLetter(_event: KeyboardEvent): void{
        console.log (_event);
    }
}