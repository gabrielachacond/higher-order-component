import React from "react";
import "./styles.css";

const App = () => (
  <main className="Application">
    <section className="pizzas">
      <WithPizzasCounted className="pizza-container" />
    </section>
  </main>
);

export default App;

const WithCalculator = (Component) =>
  class extends React.Component {
    state = {
      count: 0,
      invitades: 0,
      porciones: 0
    };

    handleChangeInvitades = (e) => {
      this.setState({ invitades: e.target.value });
      this.calculatePizzas();
    };

    handleChangePorciones = (e) => {
      this.setState({ porciones: e.target.value });
      this.calculatePizzas();
    };

    handleReset = () => {
      this.setState({ count: 0, invitades: 0, porciones: 0 });
    };

    calculatePizzas = () => {
      this.setState((prevState) => {
        const count = Math.ceil(
          (prevState.invitades * prevState.porciones) / 8
        );
        return { count };
      });
    };

    render() {
      const { invitades, porciones, count } = this.state;
      return (
        <div className="pizza-container">
          <Component
            inputInvitades={invitades}
            onChangeInvitades={this.handleChangeInvitades}
            inputPorciones={porciones}
            onChangePorciones={this.handleChangePorciones}
            pizzaCount={count}
            onReset={this.handleReset}
          />
        </div>
      );
    }
  };

const CounterPizzas = (props) => {
  const {
    inputInvitades,
    onChangeInvitades,
    inputPorciones,
    onChangePorciones,
    pizzaCount,
    onReset
  } = props;

  return (
    <div className="counterPizzas">
      <input
        type="number"
        label="Invitad@s"
        value={inputInvitades}
        onChange={onChangeInvitades}
      />{" "}
      Invitad@s{" "}
      <input
        type="number"
        label="Porciones"
        value={inputPorciones}
        onChange={onChangePorciones}
      />{" "}
      Porciones por persona <p>Necesitarían {pizzaCount} pizzas </p>
      <button onClick={onReset}>Reset</button>
      {/* <span>{props.pizzas}</span> */}
    </div>
  );
};

const WithPizzasCounted = WithCalculator(CounterPizzas);
