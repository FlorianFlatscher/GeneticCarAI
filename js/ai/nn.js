class NeuralNetwork {
  constructor(model) {
    tf.setBackend("cpu");

    if (model != null) {
      this.model = model;
    } else {
      this.model = tf.tidy(() => { return this.createModel()});
    }
  }

  createModel() {

      tf.setBackend("cpu");
      const model = tf.sequential();

      const hidden = tf.layers.dense({
        units: 7,
        inputShape: [9],
        activation: "sigmoid"
      });
      const output = tf.layers.dense({
        units: 2,
        activation: "sigmoid"
      });

      model.add(hidden);
      model.add(output);
      return model;

  }

  guess(inputs) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs]);
      const ys = this.model.predict(xs);
      const outputs = ys.dataSync();


      return outputs;
    });
  }

  mutate(rate) {
    tf.tidy(() => {
      let w = this.model.getWeights();
      let newW = []
      for (let i = 0; i < w.length; i++) {
        let values = w[i].dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            values[j] = values[j] + randomGaussian();
          }
        }

        let newTensor = tf.tensor(values, w[i].shape);
        newW.push(newTensor);
      }

      this.model.setWeights(newW);
    });
  }

  crossover(model2) {
    return tf.tidy(() => {
      const w1 = this.model.getWeights().slice();
      const w2 = model2.getWeights().slice();
      const newW = [];
      for (let i = 0; i < w1.length; i++) {
        const values1 = w1[i].dataSync().slice();
        const values2 = w2[i].dataSync().slice();
        for (let j = 0; j < values1.length; j++) {
          if (random(1) < 0.5) {
            values1[j] = values2[j];

          }
        }
        let newTensor = tf.tensor(values1, w1[i].shape);

        newW.push(newTensor);
      }
      const newM = this.createModel();

      newM.setWeights(newW);

      return new NeuralNetwork(newM);
    });

  }
}
