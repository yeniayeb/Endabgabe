
namespace firework {

  export class Client {
    
    public apiUrl: string = herokuUrl;

    constructor() {

    }

    async getAllRockets() {
      let settings: object = this.getHeaderSettings();
      try {
        const fetchResponse = await fetch(this.apiUrl + "rockets", settings);
        const data: RocketObject[] = await fetchResponse.json();
        return data
      } catch (e) {
        throw Error(e)
      }
    }

   async deleteRocket(id: string) {
      let settings: object = this.getHeaderSettings("DELETE");
      try {
        const fetchResponse = await fetch(this.apiUrl + "rocket/"+id, settings);
        const data: RocketObject[] = await fetchResponse.json();
        return data
      } catch (e) {
        throw Error(e)
      }
    }

    async postRocket(rockets: RocketObject) {
      let settings: object = this.getHeaderSettings('POST')
      try {
       
        const fetchResponse = await fetch(this.apiUrl + "rockets", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rockets)
        });
        const data: RocketObject = await fetchResponse.json();
        return data

      } catch (e) {
        throw Error(e)
      }
    }

    private getHeaderSettings(methodType: String = 'GET', body?: object): object {
      switch (methodType) {
        case 'POST':
          return {
            method: methodType,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          };
          break;
        default:
          return {
            method: methodType,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };
      }

    }

  }


}