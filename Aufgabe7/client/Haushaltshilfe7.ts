namespace L07_Haushaltshilfe {
    window.addEventListener("load", handleLoad);

    async function handleLoad(): Promise<void> {
        
        let response: Response = await fetch("Data2.json");
        let content: string = await response.text();
        let data: Data = JSON.parse(content);
        let form: HTMLDivElement = <HTMLDivElement> document.querySelector("#form");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#button");
        form.addEventListener("change", handleChange);
        submit.addEventListener("click", sendOrder);
    
        document.querySelector("#buttonreset")?.addEventListener("click", clickDelete);
        generateContent(data);

    }

    function clickDelete(): void {
        let order: HTMLDivElement = <HTMLDivElement> document.querySelector("#order");
        order.innerHTML = "";  
    }

    async function sendOrder(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("index.html?" + query.toString());
        alert("Vielen Dank für ihre Bestellung! Sie wird sofort bearbeitet :)");
    }

    function handleChange(_event: Event): void {
        //console.log(_event);
        let order: HTMLDivElement = <HTMLDivElement> document.querySelector("#order");
        order.innerHTML = "";

        let data: FormData = new FormData(document.forms[0]);
        let total: number = 0;

        for (let entry of data) {
            if (entry[0] == "Artikel") {
                let item: HTMLInputElement = <HTMLInputElement> document.querySelector("[value='" + entry[1] + "']");
                let price: number = Number(item.getAttribute("price"));
                let amount: number = Number (data.get(entry[1] + "Menge"));
                let einheit: string = <string> (item.getAttribute("einheit"));
                
                total += price * amount;
                order.innerHTML += item.value + " | " + amount + " " + einheit + ": " + price * amount + " €" + "<br> <br>";
            }

            if (entry[0] == "Geld") {
                let item: HTMLInputElement = <HTMLInputElement> document.querySelector("[value='" + entry[1] + "']");
                let betrag: number = Number(data.get("Betrag"));
                order.innerHTML += item.value + ": " +  betrag + " €" + " <br>" + " Gebühr: 5€ <br> <br>";
                total += 5;
            }

            if (entry[0] == "Hausarbeiten") {
                let item: HTMLInputElement = <HTMLInputElement> document.querySelector("[value='" + entry[1] + "']");
                let price: number = Number(item.getAttribute("price")); 
                total += price;
                order.innerHTML += item.value + ": " + price + " €" + "<br> <br>";
            }

            if (entry[0] == "Zahlung") {
                let item: HTMLInputElement = <HTMLInputElement> document.querySelector("[value='" + entry[1] + "']");
                order.innerHTML += "--------------------------------- <br> Zahlungsmethode: " + item.value + "<br> <br>";
            }

        }
        let supermarkt: string = <string> data.get("Supermarkt");
        order.innerHTML += "Supermarkt Präferenz: " + supermarkt + "<br>" + "______________________ <br>" + "Total: " + total + "€";

    }

}