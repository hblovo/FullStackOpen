import { render, screen } from '@testing-library/react'
import Blog from '../Blog'
import { expect, test,vi } from 'vitest'
import userEvent from '@testing-library/user-event'
test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Testing React components',
    author: 'Full Stack Open',
    url: 'https://test.com',
    likes: 10
  }
  const { container } = render(<Blog blog={blog} />)
  expect(screen.getByText('Testing React components Full Stack Open')).toBeDefined()
  const div = container.querySelector('.showWhenVisible')
  expect(div).toHaveStyle('display: none')
})
test('URL and likes are shown after clicking view', async () => {
  const blog = {
    title: 'Testing visibility',
    author: 'FullStack',
    url: 'https://test.com',
    likes: 10,
    user: { username: 'tester', name: 'Test User' }
  }
  const mockUser = { username: 'tester' }

  const { container } = render(<Blog blog={blog} user={mockUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.showWhenVisible')
  expect(div).not.toHaveStyle('display: none')
  expect(screen.getByText('https://test.com')).toBeDefined()
  expect(screen.getByText(/likes 10/)).toBeDefined()
})

test('Like button clicked twice calls handler twice', async () => {
  const blog = {
    title: 'Testing likes',
    author: 'FullStack',
    url: 'https://test.com',
    likes: 10,
    user: { username: 'tester' }
  }
  const mockUser = { username: 'tester' }
  const mockHandler = vi.fn() // 创建模拟函数 (Create mock function)

  render(<Blog blog={blog} user={mockUser} updateLikes={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Verify call count
  expect(mockHandler.mock.calls).toHaveLength(2)
})
