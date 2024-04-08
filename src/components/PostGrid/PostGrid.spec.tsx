// test
import { ByRoleMatcher, render, screen } from "@testing-library/react";
// component
import PostCard, { PostCardProps } from "../PostCard";
import PostGrid, { PostGridProps } from ".";
// types
import { PostImageType, PostType } from "../../@types/Post";

jest.mock("./styles.scss", () => ({}));

const generatePostImageMock = (id: number) : PostImageType => {
  const image: PostImageType = {
    url: `img/img-${id}.jpg`,
    title: `title ${id}`,
    thumbnail: "https://example.com/thumbnail.jpg",
  }

  return image
};

const generatePostTypeMock = (id: number) : PostType => {
  const post: PostType = {
    userId: id,
    id: id,
    title: "Test",
    body: "Test PostCard component",
    image: generatePostImageMock(id) ,
  }

  return post
};

const postsMock: PostType[] = [
  generatePostTypeMock(1),
  generatePostTypeMock(2),
  generatePostTypeMock(3)
];

const postGridPropsMock: PostGridProps = {
  posts: postsMock
}

describe("<PostGrid />", () => {
  it('is a dummy test', () => {
    expect(1).toBe(1)
  });

  it("should render posts", () => {
    render(<PostGrid { ...postGridPropsMock } />);

    const postGridAllByRole = (type: ByRoleMatcher) => screen.getAllByRole(type, { name: /title/i })

    expect(postGridAllByRole("heading"))
      .toHaveLength(3)

    expect(postGridAllByRole("img"))
      .toHaveLength(3)

    expect(screen.getAllByText(/body/i))
      .toHaveLength(3)

    expect(screen.getByRole("img", { name: /title 3/i }))
      .toHaveAttribute("src", "img/img-3.jpg")
  });

  // Check snapshot
  it("should match snapshot", () => {
    const { container } = render(<PostGrid { ...postGridPropsMock } />);

    expect(container.firstChild).toMatchSnapshot()
  });
});
