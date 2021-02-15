
namespace firework {

  //global canvasrendering
  export let crc2: CanvasRenderingContext2D;
  //global canvas element
  export let canvas: HTMLCanvasElement;
  //all rockets
  let rockets: Rocket[] = [];
  //all rocketobjects
  let allRockets: RocketObject[] = [];
  export let allScatters: Scatter[] = [];

  // dom elements for typescript 
  let addButton: HTMLButtonElement;
  let testButton: HTMLButtonElement;
  let rocketName: HTMLInputElement;
  let colorSlider: HTMLInputElement;
  let secondColorSlider: HTMLInputElement;
  let sizeSlider: HTMLInputElement;
  let speedSlider: HTMLInputElement;
  let colorOutput: HTMLSpanElement;
  let secondColorOutput: HTMLSpanElement;
  let sizeOutput: HTMLSpanElement;
  let speedOutput: HTMLSpanElement;

  let rocketTable: HTMLElement;
  // server calls
  let client: Client;

  // first add event page load
  window.addEventListener("load", onPageLoad);

  
  function onPageLoad() {
    // create new client 
    client = new Client();

    //initalize dom elements
    colorSlider = document.getElementById("colorSlider") as HTMLInputElement;
    secondColorSlider = document.getElementById("secondColorSlider") as HTMLInputElement;
    rocketName = document.getElementById("rocketName") as HTMLInputElement;
    speedSlider = document.getElementById("speedSlider") as HTMLInputElement;
    sizeSlider = document.getElementById("sizeSlider") as HTMLInputElement;

    colorOutput = document.getElementById("colorOutput");
    colorOutput.innerHTML = colorSlider.value;

    secondColorOutput = document.getElementById("secondColorOutput");
    secondColorOutput.innerHTML = secondColorSlider.value;

    sizeOutput = document.getElementById("sizeOutput");
    sizeOutput.innerHTML = sizeSlider.value;

    speedOutput = document.getElementById("speedOutput");
    speedOutput.innerHTML = speedSlider.value;

    rocketTable = document.getElementById("rocketBody") as HTMLElement;

    // show values in html
    colorSlider.oninput = function (event: Event): void {
      let target = event.target as HTMLInputElement;
      colorOutput.innerHTML = target.value;
    }
     // show values in html
    secondColorSlider.oninput = function (event: Event): void {
      let target = event.target as HTMLInputElement;
      secondColorOutput.innerHTML = target.value;
    }
     // show values in html
    speedSlider.oninput = function (event: Event): void {
      let target = event.target as HTMLInputElement;
      speedOutput.innerHTML = target.value;
    }
     // show values in html
    sizeSlider.oninput = function (event: Event): void {
      let target = event.target as HTMLInputElement;
      sizeOutput.innerHTML = target.value;
    }
    //buttons
    addButton = document.getElementById("addRocket") as HTMLButtonElement;
    testButton = document.getElementById("testRocket") as HTMLButtonElement;
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    //dont do anything if no canvas available
    if (!canvas)
      return;

    //add click events
    canvas.addEventListener("mousedown", launchRockets);
    addButton.addEventListener("click", postRocket);
    testButton.addEventListener("click", testRocket);

    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d")
    //add inital canvas style
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    //set the background from canvas
    setBackground();
    // get on page load all rocket from database
    getAllRockets();
    //start the gameloop
    setInterval(gameLoop, 16);

  }

  function launchRockets(event: MouseEvent): void {
    //generate a x position where the rockets start
    for (let i = 0; i < allRockets.length; i++) {
      launchFrom(Math.random() * canvas.width * 2 / 3 + canvas.width / 6, allRockets[i]);
    }
  }

  // get the values from html and create new rocketobject and pass it to other function
  function testRocket(): void {
    let testRocket: RocketObject = {
      name: rocketName.value,
      color: Number.parseInt(colorSlider.value),
      secondColor: Number.parseInt(secondColorSlider.value),
      size: Number.parseFloat(sizeSlider.value),
      speed: Number.parseInt(speedSlider.value)
    }
    launchFrom(Math.random() * canvas.width * 2 / 3 + canvas.width / 6, testRocket);
  }
  // test the saved object and launch them
  function testSavedRocket(rocketobject: RocketObject): void {
     
    launchFrom(Math.random() * canvas.width * 2 / 3 + canvas.width / 6, rocketobject);
  }

  function testSelectedRocket(event: Event): void {
    // get the clicked element
    let target = event.currentTarget as HTMLAnchorElement;
    //get the index, which row is clicked
    //2
    let index = Number.parseInt(target.getAttribute("data-index"))
    //get the rocket at index from rockets list
    let selectedRocket: RocketObject = allRockets[index]
    //test it
    testSavedRocket(selectedRocket)
  }

  
  async function deleteSelectedRocket(event: Event) {
   // get the clicked element
    let target = event.currentTarget as HTMLAnchorElement;
    //get the index, which row is clicked
    let index = Number.parseInt(target.getAttribute("data-index"))
    //get the rocket at index from rockets list
    let selectedRocket: RocketObject = allRockets[index]
    // delete the rocket from the rockets list
    await client.deleteRocket(selectedRocket._id);
    // refresh rockets, since its deleted
    getAllRockets();

  }
  
  // launch rocket from position x and add new rocket instances by passing rocketobject
  function launchFrom(posX: number, rocketObj: RocketObject): void {

    // set the position of the rocket
    let pos: Vector = { x: posX, y: canvas.height };
    // create new rocket instance
    let rocket = new Rocket(pos, rocketObj);
    
    rocket.vel.y = Math.random() * -3 - 4;
    rocket.vel.x = Math.random() * 3 - 3;

    rockets.push(rocket);
  }

  function gameLoop(): void {

    setBackground();
    let queueRockets: Rocket[] = [];
    for (var i = 0; i < rockets.length; i++) {
      // update and render
      rockets[i].animate();

      //explode in the upper 80% of screen
      
      if (rockets[i].pos.y < canvas.height * 0.2) {
        allScatters.push(...rockets[i].createScatter());
        // if the condition does not met, than queue the rockets
      } else {
        queueRockets.push(rockets[i]);
      }
    }
    rockets = queueRockets;
    //explosion
    for (var i = 0; i < allScatters.length; i++) {
      allScatters[i].animate();
     
      ;
    }
  }
  // get all rockets from server
  async function getAllRockets() {
    allRockets = await client.getAllRockets()
    printRockets()
  }
  //print all rockets
  function printRockets() {

    let rows = allRockets;
    //how many columns a row has
    var cols = ["_id","name","size","color","secondColor","speed"]

    var headerRow = '';
    var bodyRows = '';

    for (let i = 0; i < rows.length; i++) {
      let row: any = rows[i];
      
      //create for each rocket a tr table row
      bodyRows += '<tr>';
      //cols = ["name", "siuze", "color"...]
      for (let j = 0; j < cols.length; j++) {
        let colName = cols[j];
        //add the elements row[colName] = id value, name value, etc.
        bodyRows += '<td>' + row[colName] + '</td>';
      }
      // add the action buttons after each row
      bodyRows += `<td>
      <a class="edit" data-index="${i}" title="Select" data-toggle="tooltip"><i class="fa fa-check"></i></a>
      <a class="delete"  data-index="${i}" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
      </td>`
      // close the table row
      bodyRows += '</tr>';
    }

    rocketTable.innerHTML = bodyRows;
    let editElements = document.getElementsByClassName("edit");
    for (let i = 0; i < editElements.length; i++) {
      editElements[i].addEventListener("click", testSelectedRocket);
    }

    let deleteElements = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteElements.length; i++) {
      deleteElements[i].addEventListener("click", deleteSelectedRocket);
    }

  }


  async function postRocket(): Promise<RocketObject> {
    let testRocket: RocketObject = {
      name: rocketName.value,
      color: Number.parseInt(colorSlider.value),
      secondColor: Number.parseInt(secondColorSlider.value),
      size: Number.parseFloat(sizeSlider.value),
      speed: Number.parseInt(speedSlider.value)
    }
    let posted: RocketObject = await client.postRocket(testRocket)
    allRockets = await client.getAllRockets();
    getAllRockets()
    console.log(posted)
    return posted;
  }

  function setBackground(): void {

    crc2.save();
    crc2.fillStyle = "rgba(0, 0, 0, 0.15)";
    crc2.fillRect(0, 0, canvas.width, canvas.height);
    var text = "Welcome!";
    crc2.textAlign = "center"
    crc2.fillStyle = "red";
    crc2.font = "30px Comic Sans MS";
    crc2.fillText(text, canvas.width / 2, canvas.height / 4);

  }

}