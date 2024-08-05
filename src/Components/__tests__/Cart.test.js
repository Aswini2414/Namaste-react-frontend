import { render, screen, fireEvent, act } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import Mock_Data from "./mocks/mockResMenu.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import RestaurantCategory from "../RestaurantCategory";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import ItemList from "../ItemList";
import Header from "../Header";

// Mock the fetch function globally
jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(Mock_Data),
  })
);

afterAll(() => {
  // Restore fetch after all tests
  global.fetch.mockRestore();
});

it("Should Load Restaurant Menu Component", async () => {
  await act(async () =>
    render(
      <>
        <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
            <RestaurantMenu />
          </Provider>
        </BrowserRouter>
      </>
    )
  );

  const cakes = screen.getByText("Cakes(11");
  fireEvent.click(cakes);
  const item = screen.getAllByTestId("food-items");
    expect(item.length).toBeInTheDocument(11);
    
    const addBtns = screen.getAllByRole("button", { name: "+ADD" });
    fireEvent.click(addBtns[0]);

    const cartItems = screen.getByText("Cart-(1 items)");
    expect(cartItems).toBeInTheDocument();
});
