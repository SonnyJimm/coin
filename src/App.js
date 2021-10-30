import axios from "axios";
import { useForm } from "react-hook-form";

import "./App.css";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
    let request = false;
    let counter = 0;
    while (counter < 10 || request) {
      counter++;
      axios
        .post("http://localhost:9000", {
          buySell: "buy",
          price: data.price,
          quantity: data.total,
          total: parseFloat(data.total) + "",
          userCode: data.userCode,
          currency1: "IHC/MNT",
          currency2: data.currency2,
        })
        .then((response) => {
          request = true;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="coin_buy_form">
        <label>
          Token :
          <input
            id="token"
            placeholder="Өөрийн token оруулна уу ?"
            {...register("token", { required: true })}
          />
        </label>
        <label>
          Quantity :
          <input
            placeholder="Нийт авах хэмжээ"
            id="total"
            {...register("total", { required: true })}
          />
        </label>
        <label>
          User Code :
          <input
            id="userCode"
            placeholder="Хэрэглэгчийн код"
            {...register("userCode", { required: true })}
          />
        </label>
        <label>
          {" "}
          currency2 :
          <input
            id="currency2"
            placeholder="Авч буй Coin ий код"
            {...register("currency2", { required: true })}
          />
        </label>
        <button>Хүсэлт явуулах</button>
      </form>
    </div>
  );
}

export default App;
