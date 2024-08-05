import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../utils/appStore";
import "@testing-library/jest-dom";

it("Should load Header Component with a login Button", () => {
  render(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    </>
    );
    
    const loginBtn = screen.getByRole("button",{name:"Login"});

    expect(loginBtn).toBeInTheDocument();
});

it("Should load Header Component with a Cart items 0", () => {
  render(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    </>
  );

  const CartItems = screen.getByText("Cart-(0 items)");

  expect(CartItems).toBeInTheDocument();
});

it("Should load Header Component with a Cart item", () => {
  render(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    </>
  );

  const CartItems = screen.getByText(/Cart/);

  expect(CartItems).toBeInTheDocument();
});

it("Should change login button to logout Button onclick", () => {
  render(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    </>
  );

    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();

    fireEvent.click(loginBtn);

    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    expect(logoutBtn).toBeInTheDocument();
});
