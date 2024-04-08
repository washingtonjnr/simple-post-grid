// mock server
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
// to test
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
// template
import Home from ".";
// utils
import { apiUrl } from "../../utils/load-posts";
import userEvent from "@testing-library/user-event";

const handlers = [
  http.get(`*${apiUrl}*`, async ({ request, params, cookies }) => {
    return HttpResponse.json([1, 2, 3].map((n: number): object => {
      const obj = {
        userId: n,
        id: n,
        title: `Title ${n}`,
        body: `Body ${n}`,
        url: `img${n}.jpeg`
      };

      return obj;
    }));
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search and posts', async () => {
    const { debug } = render(<Home />);

    expect.assertions(2)

    const images = screen.getAllByRole("img", { name: /title/i });
    expect(images).toHaveLength(3);

    const search = screen.getByPlaceholderText(/Search by name, text or id/i);
    expect(search).toBeInTheDocument();

    // passes after noPosts disappears
    const noPosts = screen.getByText("Não há resultado");
    await waitForElementToBeRemoved(noPosts);

    debug();
  });

  it('should search of posts', async () => {
    const { debug } = render(<Home />);

    expect.assertions(10)

    // passes after noPosts disappears
    const noPosts = screen.getByText("Não há resultado");
    await waitForElementToBeRemoved(noPosts);

    expect(screen.getByRole("heading", { name: "Title 1" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Title 2" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Title 0" })).not.toBeInTheDocument()

    // Part search
    const search = screen.getByPlaceholderText(/Search by name, text or id/i);

    userEvent.type(search, "Title 1")
    expect(screen.getByRole("heading", { name: "Title 1" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Title 2" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Title 0" })).not.toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole("heading", { name: "Title 1" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Title 2" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Title 0" })).not.toBeInTheDocument()

    userEvent.type(search, "No more posts")
    expect(screen.getByText("Não há resultado")).toBeInTheDocument()

    // TODO: add scrolling test that adds posts

    debug();
  });
});
