// test
import { render, screen } from "@testing-library/react";
// component
import PostCard, { PostCardProps } from ".";
// types
import { PostImageType } from "../../@types/Post";

const postImageMock: PostImageType = {
  url: "https://example.com/image.jpg",
  title: "Image Title 1",
  thumbnail: "https://example.com/thumbnail.jpg",
};

const postCardPropsMock: PostCardProps = {
  id: 1,
  title: "Test",
  body: "Test PostCard component",
  image: postImageMock,
};

describe("<PostCard />", () => {
  it("should render component correctly", () => {
    render(<PostCard { ...postCardPropsMock } />);

    // Check img
    expect(screen.getByRole("img", { name: /Image Title/i })).toHaveAttribute(
      "src",
      "https://example.com/image.jpg."
    );

    // Check POSTCARD
    expect(
      screen.getByRole("heading", { name: "Image Title 1" })
    ).toBeInTheDocument();

    // Check body
    expect(
      screen.getByText("Test PostCard component")
    ).toBeInTheDocument();
  });

  // Check snapshot
  it("should match snapshot", () => {
    const { container } = render(<PostCard { ...postCardPropsMock } />);

    expect(container.firstChild).toMatchSnapshot()
  });
});
