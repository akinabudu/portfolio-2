import { Post } from '../../types/post';
import { render, screen } from '@testing-library/react';
import PostList from './PostList';
import * as hooks from '../../hooks/useSanityImage';

jest.mock('../../hooks/useSanityImage');

const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Post 1',
    description: 'Description for post 1',
    _createdAt: '2022-10-22',
    slug: 'post1',
    mainImage: {
      asset: {
        _ref: '123',
        metadata: {
          lqid: '12324'
        }
      },
    },
    categories: [
      {
        name: 'Category 1',
        description: 'Description for category 1',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
  {
    _id: '2',
    title: 'Post 2',
    description: 'Description for post 2',
    _createdAt: '2022-10-22',
    slug: 'post-2',
    mainImage: {
      asset: {
        _ref: '234',
        metadata: {
          lqid: '4343211'
        }
      },
    },
    categories: [
      {
        name: 'Category 2',
        description: 'Description for category 2',
      },
      {
        name: 'Category 3',
        description: 'Description for category 3',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
];
describe('<PostList/>', () => {
  jest.spyOn(hooks, 'default').mockReturnValue({
    loader: jest.fn(),
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<PostList posts={mockPosts} />);

    expect(screen.getAllByRole('link')).toHaveLength(2)
  });
});
