import { render, screen } from "@testing-library/react";
import ContextProvider from "../../../testUtils/ContextProvider";
import StatsPage from "./StatsPage";

vi.mock("react-chartjs-2", () => ({
  Bar: () => <div>Bar chart</div>,
  Doughnut: () => <div>Doughnout chart</div>,
}));

describe("Given the StatsPage component", () => {
  describe("When it receives manga stats", () => {
    test("Then it should show 'Bookshelf stats' inside a heading", async () => {
      const expectedPageTitle = /bookshelf stats/i;

      render(
        <ContextProvider>
          <StatsPage />
        </ContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", {
        name: expectedPageTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    test("Then it should show 'Books and Authors Read per Year' inside a heading", async () => {
      const expectedChartTitle = /books and authors read per year/i;

      render(
        <ContextProvider>
          <StatsPage />
        </ContextProvider>,
      );

      const chartTitle = await screen.findByRole("heading", {
        name: expectedChartTitle,
      });

      expect(chartTitle).toBeInTheDocument();
    });

    test("Then it should show a description of bar chart of read books and authors by year", async () => {
      const chartLabel =
        "2022: 2364 pages read. 2023: 5686 pages read. 2024: 1068 pages read. 2025: 1949 pages read";

      render(
        <ContextProvider>
          <StatsPage />
        </ContextProvider>,
      );

      const chart = screen.getByText(chartLabel);

      expect(chart).toBeInTheDocument();
    });

    test("Then it should show a legend tag for fantasy as Fantasy: 13", async () => {
      const expectedTag = /fantasy: 13/i;

      render(
        <ContextProvider>
          <StatsPage />
        </ContextProvider>,
      );

      const fantrasyTag = await screen.findByText(expectedTag);

      expect(fantrasyTag).toBeInTheDocument();
    });
  });
});
