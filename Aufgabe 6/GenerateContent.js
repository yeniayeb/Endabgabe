"use strict";
var HaushaltshilfeA5;
(function (HaushaltshilfeA5) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Artikel":
                    group = createMultiple(items, category);
                    break;
                case "Supermarkt":
                    group = createSelect(items, category);
                    break;
                case "Hausarbeiten":
                    group = createSelect(items, category);
                    break;
                case "Zahlung":
                    group = createSingle(items, category);
                    break;
                case "Liefermethode":
                    group = createSingle(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
        function createSelect(_items, _category) {
            let group = document.createElement("div");
            let select = document.createElement("select");
            select.name = _category;
            for (let item of _items) {
                let newoption = document.createElement("option");
                newoption.text = item.name;
                select.add(newoption);
                newoption.setAttribute("price", item.price.toFixed(2));
                newoption.value = item.name;
                group.appendChild(select);
            }
            return group;
        }
        function createSingle(_items, _category) {
            let group = document.createElement("div");
            for (let item of _items) {
                let radio = document.createElement("input");
                radio.type = "radio";
                radio.setAttribute("price", item.price.toFixed(2));
                radio.setAttribute("einheit", item.einheit);
                radio.value = item.name;
                radio.name = _category;
                radio.id = item.name;
                let label = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;
                group.appendChild(radio);
                group.appendChild(label);
            }
            return group;
        }
        function createMultiple(_items, _category) {
            let group = document.createElement("div");
            for (let item of _items) {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", item.price.toFixed(2));
                checkbox.setAttribute("einheit", item.einheit);
                checkbox.value = item.name;
                checkbox.name = _category;
                checkbox.id = item.name;
                let label = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;
                group.appendChild(checkbox);
                group.appendChild(label);
                let menge = document.createElement("input");
                menge.type = "number";
                menge.name = item.name + "Menge";
                menge.max = "1000";
                menge.min = "0";
                menge.step = "1";
                menge.value = "0";
                group.appendChild(menge);
            }
            return group;
        }
    }
    HaushaltshilfeA5.generateContent = generateContent;
})(HaushaltshilfeA5 || (HaushaltshilfeA5 = {}));
//# sourceMappingURL=GenerateContent2.js.map