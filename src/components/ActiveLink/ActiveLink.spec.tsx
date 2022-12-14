import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "/",
  })),
}));

describe("ActiveLink component", () => {
  it("should be able to renders correctly", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should be able to add active class if the link as currently active", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
