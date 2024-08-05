import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "./mocks/resCardMock.json";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

it("Should render rescard component with props Data", () => {
    render(
        <>
            <RestaurantCard rest_data={MOCK_DATA} />
        </>
    );

    const name = screen.getByText("Mehfil");

    expect(name).toBeInTheDocument();
});
