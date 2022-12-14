import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("next-auth/react", () => ({
  useSession: () => [null, false],
}));

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("should be able to renders correctly", () => {
    render(
      <Home
        product={{
          priceId: "fake-price-id",
          amount: "R$10,00",
        }}
      />
    );

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("should be loads init data", async () => {
    const stripedMocked = jest.mocked(stripe.prices.retrieve);
    stripedMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: "fake-price-id", amount: "$10.00" } },
      })
    );
  });
});
