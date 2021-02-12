import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders hello world", () => {
  const stuff = render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
