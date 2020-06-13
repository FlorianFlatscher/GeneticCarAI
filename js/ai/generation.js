class Generation{
  constructor(cars = []){
    this.cars = cars;
    if(cars.length > 0){

    }else{
      for(let i = 0; i < generationSize; i++){
        this.cars.push(new Driver());
      }
    }
    this.oldCars = [];
    document.getElementById('alive').innerHTML = "Alive : "+this.cars.length;
    this.dieNext = false;
  }

  update(){
    for(let car of this.cars){
      car.update();
    }
    if(this.cars.length > 0 && !this.dieNext)
      return true;
    return false;
  }

  show(){
    for(let car of this.cars){
      car.show();
    }
  }

  getNewGeneration(){
    for(let i = 0; i < this.cars.length; i++){
      this.delete(i);
      i--;
    }
    let max = 0;

    for(let car of this.oldCars){
      car.fitness *= car.fitness;
      if(car.fitness > max)
        max = car.fitness;

    }

    let newCars = [];

    for(let car of this.oldCars){
      car.fitness /= max;
      if(car.fitness == 1 && newCars.length == 0){
        console.log(car.fitness);
        newCars.push(new Driver(car.brain.crossover(car.brain.model)));
      }
    }




    for(let i = 1; i < generationSize; i++){
      newCars.push(new Driver(this.pickOne().brain.crossover(this.pickOne().brain.model)));
      newCars[i].brain.mutate(0.05);
    }
    for(let car of this.oldCars){
      car.brain.model.dispose();

    }


    return newCars;
  }

  pickOne(){
    let selection = [];
    for(let i = 0; i < this.oldCars.length; i++){
      for(let l = 0; l < this.oldCars[i].fitness*100; l++){
        selection.push(this.oldCars[i]);
      }
    }

    let selected = selection[floor(random(selection.length))];

    return selected;
  }

  delete(index){
    let car = this.cars[index];
    this.cars.splice(index, 1);
    this.oldCars.push(car);

    document.getElementById('alive').innerHTML = "Alive : "+this.cars.length;
  }
}
