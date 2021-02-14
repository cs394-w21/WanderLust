import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the world at your finger tips", () => {
  const stuff = render(<App />);
  expect(screen.getByText(/The World at your Finger Tips/i)).toBeInTheDocument();
});
